import csv
import json

csvfile = open('2015.csv', 'r')
jsonfile = open('2015_.json', 'w')

fieldnames = ("rank","team","sport", "country", "val2015", "years_competing", "domestic_prices", "european_prices", "worldwide_prices","#2015", "val2014","val2013", "val2012", "val2011", "val2010" , "total_prices" ,"price2014", "#2014", "price2013", "#2013", "price2012", "#2012", "price2011", "#2011", "price2010", "#2010", "totalin5")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')

print jsonfile  