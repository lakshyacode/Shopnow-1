from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
app = Flask(__name__)


def gethtml(n, search):
    if n == 1:
        url = f'https://bazaar.shopclues.com/search?q={search}&mcid=aff&utm_source=OMG&tid=nh&utm_medium=CPS&utm_campaign=749927%7C10000&__ar=Y'
    elif n == 2:
        url = f'https://www.vijaysales.com/search/{search}'
    elif n == 3:
        url = f"https://fundamental.in/?product_cat=&s={search}&post_type=product"
    elif n == 4:
        url = f'https://www.flipkart.com/search?q={search}&discount_range_v1%255B%255D%3D10%2525%2Bor%2Bmore'
    htmlele = requests.get(url).content
    soup = BeautifulSoup(htmlele, "html5lib")
    return soup


def vijaysales(word):
    soup = gethtml(2, word)
    result = soup.find_all('div', 'col-lg-12 col-xs-12')
    itemlst = []
    # print(result)
    for i in range(0, 5):
        item = result[i]
        atag = item.find('a', 'vj-cur-pnter')
        # print(atag)
        if atag != None:
            title = item.find('a', 'vj-cur-pnter').get('title')
            itemurl = item.find('a', 'vj-cur-pnter').get('href')
            imgurl = item.find(
                'img', 'img-responsive Dynamic-Bucket-img lazy b-loaded').get('data-original')
            price = item.find('div', 'Dynamic-Bucket-vsp dvpricepdlft').text
            itemlst.append(
                {"title": title, "price": price, "imgurl": imgurl, "itemurl": itemurl, "platform": "Vijay-Sales"})
    return itemlst


def shopclues(word):
    soup = gethtml(1, word)
    result = soup.find_all('div', class_="column col3 search_blocks")
    itemlst = list()
    if (len(result) != 0):
        for i in range(0, 5):
            item = result[i]
            main = item.find('a')
            itemurl = "https://" + main.get('href')[2::]
            imgsec = main.find('img')
            imgurl = imgsec.get('src')
            title = imgsec.get('title')
            price = main.find('span', 'p_price').text.strip()
            itemlst.append(
                {"title": title, "price": price, "imgurl": imgurl, "itemurl": itemurl, "platform": "Shopclues"})
    return itemlst


def fundamental(word):
    soup = gethtml(3, word)
    result = soup.find_all('div', 'products-entry clearfix product-wapper')
    itemlst = []
    for i in range(0, 5):
        item = result[i]
        atag = item.find('a', 'woocommerce-LoopProduct-link')
        imgtag = atag.find(
            'img', 'attachment-woocommerce_thumbnail size-woocommerce_thumbnail wp-post-image')
        productcontent = item.find('div', 'products-content')
        title = productcontent.find('a').text
        instag = productcontent.find('ins')
        itemurl = atag.get('href')
        imgurl = imgtag.get('src')
        price = instag.find('bdi').text
        itemlst.append(
            {"title": title, "price": price, "imgurl": imgurl, "itemurl": itemurl, "platform": "Fundamental"})
    return itemlst


def flipkart(word):
    soup = gethtml(4, word)
    result = soup.find_all('div', class_="_2kHMtA")
    itemlst = []
    for i in range(0, 5):
        item = result[i]
        atag = item.find('a', "_1fQZEK")
        imgtag = atag.find('img', "_396cs4 _3exPp9")
        itemurl = 'https://www.flipkart.com'+atag.get('href')
        imgurl = imgtag.get('src')
        title = atag.find('div', "_4rR01T").text
        price = atag.find("div", "_30jeq3 _1_WHN1").text
        itemlst.append(
            {"title": title, "price": price, "imgurl": imgurl, "itemurl": itemurl, "platform": "Flipkart"})
        # print(itemlst)
    return (itemlst)


@app.route('/shopnow/<word>', methods=['GET'])
def mainapi(word):
    shopclue_lst = shopclues(word)
    flipkart_lst = flipkart(word)
    vijaysales_lst = vijaysales(word)
    fundamental_lst = fundamental(word)
    main_item_lst = flipkart_lst+shopclue_lst+vijaysales_lst+fundamental_lst
    return jsonify(main_item_lst)


@app.route('/shopnows', methods=['GET'])
def mainapis():
    print('i am here')
    return ({'hello': 'harsh'})


if __name__ == "__main__":
    app.run(debug=True)
