###
Use literary tourism for gs: https://cloud.google.com/natural-language/docs/analyzing-entities#language-entities-string-gcloud

and check if files is here: https://console.cloud.google.com/storage/browser/literarytourist?project=cloudvisiontest-143413 


#more bookstore data:
http://indiemap.bookweb.org/

in nyc: https://bookriot.com/2017/03/22/my-quest-to-visit-every-bookstore-in-nyc/


Step 1: get all the data from bookriot and save it to data.csv 
    [check]
    `python getdata_bookriot.py`

Step 2: extract entities from every url in the data.csv
    `python getentity_bookriot.py`
    
Step 3: clean up the data data and keep only the correct entities
    ``
Step 4: use foursquare to get long/ land and address

Step 5: unify all datasets into a clean format

Step 6: visualize the dataset


### final

#append all data that has fsq extentsion together
#visualize


## Mapbox tutorial: https://www.mapbox.com/install/js/cdn-add/ 