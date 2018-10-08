from selenium import webdriver      
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


import os
from selenium import webdriver
from bs4 import BeautifulSoup
import json
import pandas as pd


''' 
This code is to get all bookpages from https://bookriot.com/read/
The scraped data contains URL of the article and saves the dataset
Runs once until the webpage is generated

Notes:

# version of webdriver should be higher then 2.32 ! -> https://chromedriver.storage.googleapis.com/index.html?path=2.32/
#otherwise unclickable

'''


BOOK_PAGE_URL = "https://bookriot.com/read/"
PATIENCE_TIME = 60
LOAD_MORE_BUTTON_XPATH = '//*[@id="recent-content"]/div[1]/a'

def mountdriver(url):
	path = '/Users/anna.nicanorova/Downloads/chromedriver'
	driver = webdriver.Chrome(path)
	driver.get(BOOK_PAGE_URL)
	#count element numbers on page
	count =  driver.find_elements_by_xpath('//*[@id="results"]/article')
	len(count)
	#click load button to ensure to get all the content
	loadMoreButton = driver.find_element_by_xpath('//*[@id="recent-content"]/div[1]/a')
	loadMoreButton.click()
	count =  driver.find_elements_by_xpath('//*[@id="results"]/article')
	len(count)

#only click until clicked mul;tiple times and the page is still not loading

# while True:
#     try:
#         loadMoreButton = driver.find_element_by_xpath('//*[@id="recent-content"]/div[1]/a')
#         time.sleep(2)
#         loadMoreButton.click()
#         time.sleep(5)
#     except Exception as e:
#         print e
#         break

def getdata()
	page = driver.page_source
	soup = BeautifulSoup(driver.page_source)
	section = soup.find('section', id='recent-content')
	soup_string = str(soup)
	dict_from_json = json.loads(section.text)
	page = driver.page_source
	print "Complete"
	time.sleep(10)
	driver.quit()


def formatdata()
	data = ast.literal_eval((section.text))
	test = section.text.encode('ascii', errors='backslashreplace')
	j = json.dumps(test)

	results = section.find('div', id='results')
	mydivs = soup.findAll("article", { "class" : "archived-post post" })

	df = pd.DataFrame(columns= ['title', 'url'])


	for x in mydivs:
		test = x.find_all('a', title=True)
		print(test)
		print(type(test))
		print(test[0]['href'])
		print(test[0]['title'])
		df.loc[len(df)]=[test[0]['title'],test[0]['href']]


	df.to_csv('data.csv', index = False, encoding='utf-8')





