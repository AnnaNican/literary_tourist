##lookuo


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