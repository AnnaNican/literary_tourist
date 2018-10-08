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


''' 
Notes:

# version of webdriver should be higher then 2.32 ! -> https://chromedriver.storage.googleapis.com/index.html?path=2.32/
#otherwise unclickable


'''

# chromedriver = "/Users/anna.nicanorova/Downloads/chromedriver"
# os.environ["webdriver.chrome.driver"] = chromedriver
# driver = webdriver.Chrome(chromedriver)
# driver.get("http://stackoverflow.com")
# driver.quit()


#browser = webdriver.Firefox()#Chrome('./chromedriver.exe')
YOUTUBER_HOME_PAGE_URL = "https://bookriot.com/read/"
PATIENCE_TIME = 60
LOAD_MORE_BUTTON_XPATH = '//*[@id="recent-content"]/div[1]/a' 


path = '/Users/anna.nicanorova/Downloads/chromedriver'
driver = webdriver.Chrome(path)

# driver = webdriver.Chrome('/Users/anna.nicanorova/Downloads/chromedriver')  # Optional argument, if not specified will search path.
# driver.get('http://www.google.com/xhtml');

# driver = webdriver.Chrome('/Users/anna.nicanorova/Downloads/chromedriver.exe')
driver.get(YOUTUBER_HOME_PAGE_URL)

# //*[@id="results"]/article[1]

# -> need to set filter!!!


#count element numbers on page
count =  driver.find_elements_by_xpath('//*[@id="results"]/article')
len(count)


while True:
    try:
        loadMoreButton = driver.find_element_by_xpath('//*[@id="recent-content"]/div[1]/a')
        time.sleep(2)
        loadMoreButton.click()
        time.sleep(5)
    except Exception as e:
        print e
        break

page = driver.page_source
soup = BeautifulSoup(driver.page_source)
dict_from_json = json.loads(soup.find("body").text)
page = driver.page_source
print "Complete"
time.sleep(10)
driver.quit()