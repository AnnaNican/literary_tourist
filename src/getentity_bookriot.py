import pandas as pd
import requests, json, re, os
import subprocess

''' The code opens url, download the html, uses gsutil to extract entities from the article and saves it into '''
''' Also run once to get the raw entities''' 



def gethtml(url):
	regex = "\/\/.*\/(.*)\/$"
	filename = re.findall(regex, url)[0]
	bashCommand = "curl -o %s %s" %(('"'+filename+'.html"'), ('"'+url+'"'))
	os.system(bashCommand)
	os.rename(("./"+filename+".html"), ("./html/"+filename+".html"))
	putonGS = "gsutil cp %s gs://literarytourist" %('./html/"'+filename+'.html"')
	os.system(putonGS)
	analyzeEntities = "gcloud ml language analyze-entities --content-file=gs://literarytourist/%s >> %s.json" %((filename+'.html'), ("./json/"+filename))
	os.system(analyzeEntities)
	print("created json")

def cleanjson(url, city, country):
	global cleandf
	regex = "\/\/.*\/(.*)\/$"
	filename = re.findall(regex, url)[0]
	with open(("./json/"+filename+".json")) as train_file:
	    dict_train = json.load(train_file)
	cleandf = pd.DataFrame(columns= ['entity', 'name', 'type', 'salience'])
	for key in dict_train['entities']:
		mention = key['mentions'][0]['text']['content']
		name = key['name']
		type_ = key['type']
		salience = key['salience']
		cleandf.loc[len(cleandf)]=[mention, name, type_, salience]
	cleandf['city'] = city
	cleandf['country'] = country
	datafile = os.path.join(str('./data/'), (filename+".csv"))
	cleandf.to_csv(datafile, index=False, encoding='utf-8')
	print("created data")


if __name__ == "__main__":
	df = pd.read_csv('data.csv')
	for rownum, row in df.iterrows():
		print row['url']
		gethtml(row['url'])
		cleanjson(row['url'], row['city'], row['country'])
		print('Done with Data Processing')
 

