#!/usr/bin/env python3

def read_second_line(line):
    return [(i, int(x)) for i, x in enumerate(line.split(',')) if x != 'x']

def read(fname):
    with open(fname, 'r') as f:
        a, b = f.read().split()
    return int(a), read_second_line(b)

def waiting_time(time, bus_id):
    bus_time = (time // bus_id) * bus_id
    if bus_time < time:
        bus_time += bus_id
    return bus_time - time, bus_id

def solve_part1(time, bus_ids):
    return min(waiting_time(time, b[1]) for b in bus_ids)

class ModEquation:
    # A 'ModEquation' defines an infinite linear series of integers
    # It is in the form a * x + b, and every integer x generates a number in the series

    # Smallest integer in the series is just self.b

    def __init__(self, a, b):
        self.a = a
        self.b = b % a

    def add_constraint(self, p, b):
        # New constraint is of the form n = p * x + b for integer x where p is prime

        # This means self.a * x + self.b = p * y + b for x, y integers and p prime
        #
        #       self.a * x = (b - self.b) % p
        #
        # Multiplicative inverse of self.a is pow(self.a, p-2, p) [Fermat's Little Theorem]
        #
        # So x = ( (b - self.b) * pow(self.a, p-2, p) ) % p
        #    x = Q % p
        #
        # So the new series of numbers is
        #
        #   n = self.a * (Q + p * x) + self.b
        #     = (self.a * p) * x + (self.a * Q + self.b)

        Q = (b - self.b) * pow(self.a, p-2, p) % p

        return ModEquation(self.a * p, self.a * Q + self.b)

    def __str__(self):
        return "{} x + {}".format(self.a, self.b)

def solve_part2(bus_ids):

    m = None
    for (b, a) in bus_ids:
        if m is None:
            # Minus b, because we are looking for a number which is b minutes
            # before the bus passes
            m = ModEquation(a, -b)

        else:
            m = m.add_constraint(a, -b)

        # print(m)

    return m.b

def main():
    time, bus_ids = read("input.txt")

    wait, bus_id = solve_part1(time, bus_ids)

    return wait * bus_id, solve_part2(bus_ids)

if __name__=="__main__":
    part1, part2 = main()
    print(part1)
    print(part2)
