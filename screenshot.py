from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
from PIL import Image
from io import BytesIO
import base64
import bs4
import chardet

start_time = time.time()

import os

options = webdriver.ChromeOptions()
options.add_argument("start-maximized")
options.add_argument("--headless")
options.add_argument("--window-size=1920,1080")
options.binary_location = "/usr/bin/chromium"
driver = webdriver.Chrome(
    options=options)

with open("page_grid_template.html", "r") as f:
    html = f.read()

bs = bs4.BeautifulSoup(html)
body = bs.find("body")

directory = 'pages'
for root, dirnames, filenames in os.walk(directory):
    for filename in filenames:
        if filename.endswith('.html'):
            fname = os.path.join(root, filename)
            print('Filename: {}'.format(fname))
            url = f"http://127.0.0.1:5500/{fname}"
            print(url)
            driver.get(url)
            with open(fname, "r") as htmlfile:
                metabs = bs4.BeautifulSoup(htmlfile.read())
                try:
                    title = metabs.find("card-label").string
                except:
                    try:
                        title = metabs.find("title").string
                    except:
                        title = driver.title
                if title == '':
                    print(f"Not found :{fname}")
            Image.open(BytesIO(base64.b64decode(driver.get_screenshot_as_base64()))).resize((640, 360), Image.LANCZOS).save(f'./assets/page_preview/{filename.replace(".html", ".webp")}', "webp", optimize=True, quality=95)

            link = bs.new_tag("a", href=f"./{fname}")
            link.append(bs.new_tag("img", src=f'./assets/page_preview/{filename.replace(".html", ".webp")}', loading="lazy"))

            div = bs.new_tag("div")
            div.append(link)
            label = bs.new_tag("label")
            label.string = title
            div.append(label)

            body.append(div)

with open("page_grid.html", "w") as f:
    f.write(str(bs))

        
elapsed = "%s seconds" % (time.time() - start_time)
print("Done in " + elapsed)