import csv, json
import pip
from geojson import Feature, FeatureCollection, Point
from geopy import geocoders  

def install(package):
    if hasattr(pip, 'main'):
        pip.main(['install', package])
    else:
        pip._internal.main(['install', package])


def create_bookstores():
	features = []
	f = open('../data/bookstores.csv')
	reader = csv.reader(f)
	headers = next(reader) 
	for row in reader:
		features.append(
				Feature(
					geometry = Point((float(row[5]), float(row[4]))),
					properties = {
					'Location': row[0],
					'Address': row[1],
					'City': row[2],
					'Country': row[3],
					'Type': row[8],
					'Description': row[6],
					'LocationURL': row[9]
					}
					)
				)
		
	collection = FeatureCollection(features)
	with open("../data/bookstores.geojson", "w") as f:
		f.write('%s' % collection)


def create_cities_json():
	gn = geocoders.GeoNames(username='annan')
	f = open('../data/bookstores.csv')
	reader = csv.reader(f)
	headers = next(reader) 
	cities = []
	for row in reader:
		city = str(row[2]+ ', ' + row[3])
		cities.append(city)

	uniquecities = set(cities)
	citycenters = []
	for city in uniquecities:
		try:
			print(city)
			coordinates = gn.geocode(city)
			print(coordinates)
			# citycenters.append(list(coordinates[1]))
			coordinates = list(coordinates[1])
			coordinates[0], coordinates[1] = coordinates[1], coordinates[0]
			citycenters.append(coordinates)
		except:
			next

	with open("../data/cities.json", "w") as f:
		f.write('%s' % citycenters)




if __name__ == '__main__':
# 	install('geojson')
	create_bookstores()
	create_cities_json()
