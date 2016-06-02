import csv
import json

csvfile = open('2010.csv', 'r')
jsonfile = open('2010.json', 'w')

fieldnames = ("rank","team","sport", "country", "value_t", "years_competing", "domestic_prices", "european_prices", "worldwide_prices","prices_t", "value_t-1", "prices_t-1", "total_prices")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')

print jsonfile  