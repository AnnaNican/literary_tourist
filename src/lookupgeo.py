


# prepare data to lookuo in foursquare
# keep only people and locations
# throw out duplicates
# replace wierd characters



CLIENT_ID
3R1NYT0BFPZMV1A2YCGA4K43Y3CLRV3BGRX12UDEBODUPA23

CLIENT_SECRET

••••••••••••••••••••••••••••••••••••••••••••••••

CLIENT_ID = 3R1NYT0BFPZMV1A2YCGA4K43Y3CLRV3BGRX12UDEBODUPA23
CLIENTSECRET = MMCTWBOV3XKDJVBVD02DY0ONPBG2NF40AMK3QBXAY4EN5CDS

curl -X GET -G \
  'https://api.foursquare.com/v2/venues/explore' \
    -d client_id="3R1NYT0BFPZMV1A2YCGA4K43Y3CLRV3BGRX12UDEBODUPA23" \
    -d client_secret="MMCTWBOV3XKDJVBVD02DY0ONPBG2NF40AMK3QBXAY4EN5CDS" \
    -d v="20170801" \
    -d ll="40.7243,-74.0018" \
    -d query="coffee" \
    -d limit=1


# need to lookup


curl -X GET -G \
  'https://api.foursquare.com/v2/venues/search' \
    -d client_id="3R1NYT0BFPZMV1A2YCGA4K43Y3CLRV3BGRX12UDEBODUPA23" \
    -d client_secret="MMCTWBOV3XKDJVBVD02DY0ONPBG2NF40AMK3QBXAY4EN5CDS" \
    -d v="20170801" \
    -d ll="41.00,28.97" \
    -d query="Nazm Hikmet Cultural Center" \
    -d limit=5
   

# find the venue of the place
#for every query in data api, do the fsq call.
#catch results and pipe them into the csv

# append them back


import pandas as pd
import geopy
from geopy.geocoders import Nominatim
import requests, json, re, os
import subprocess
from ConfigParser import *
from datetime import datetime, timedelta

config = ConfigParser()
config.read('config.ini') #read creads from files

FSQ_ID = config.get('fsq', 'CLIENT_ID')
FSQ_KEY = config.get('fsq', 'CLIENT_SECRET')
FSQ_ENDPOINT = 'https://api.foursquare.com/v2/venues/search'
TODAY = (datetime.now().strftime("%Y%m%d"))

filename = 'my-quest-to-visit-every-bookstore-in-nyc.csv'
def cleandata(filename):
df = pd.read_csv(str('./data/'+ str(filename)))



def getlonglat(location):
global longitude, latitude
geolocator = Nominatim()
location = geolocator.geocode("Scotland")
print((location.latitude, location.longitude))
longitude = round(location.longitude, 2)
latitude = round(location.latitude, 2)


def lookupfsq(entity)

entity = 'London Zoo'
findLocation = "curl -X GET -G %s -d client_id=%s -d client_secret=%s -d v=%s -d ll=%s -d query=%s -d limit=5" %(('"'+FSQ_ENDPOINT+'"'), ('"'+FSQ_ID+'"'), ('"'+FSQ_KEY+'"'), ('"'+TODAY+'"'), ('"'+str(latitude)+','+str(longitude)+'"'), ('"'+entity+'"')) 
# response = os.system(findLocation)

response = os.popen(findLocation).read()
fsqresult = json.loads(response)

# if response not empty
fsqresult['response']

#loop through object and convert to pandas
#append to one giant table that will have all the data


# if city exists, get ll
# otherwise get country ll





####
#For every file in the database
# load file as df
# filter out entities
# then do a fsq call,
# take the object and put it cleanly into a new dataframe
# append metadata, like original article, country, article title, etc
#save as a new file




