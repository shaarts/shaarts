import os
import urllib.request

# Define directories to create
ARTWORK_DIR = os.path.join("src", "assets", "artwork")
TEXTURE_DIR = os.path.join("src", "assets", "textures")

os.makedirs(ARTWORK_DIR, exist_ok=True)
os.makedirs(TEXTURE_DIR, exist_ok=True)

# List of assets to download (remote_url, local_filename)
assets = [
    # General / Texture Assets
    ("https://www.transparenttextures.com/patterns/natural-paper.png", os.path.join(TEXTURE_DIR, "natural-paper.png")),
    ("https://www.transparenttextures.com/patterns/handmade-paper.png", os.path.join(TEXTURE_DIR, "handmade-paper.png")),
    
    # Home Page Assets
    ("https://lh3.googleusercontent.com/aida/AP1WRLv8ebqroz7wxuZLYjTnjFHiu-FmkU0oU7cNy9YNqCVIucg4BpgpYp-hT8_KqykzzYYCQwfm7uUISGh-gdvF8O9xhUfy3bBbvt0pCOWWWqnVNSoiuEimAp_4P2LAthCuDaHPE1akAU3xh5_ixTIakVWDBwOpuOrOg7MNQPAqAGxyPAg3JqGQGYb0BkwACJPwEiKIoTLPKmatvaFj9iU-M0FMXmJjJghOSqUVAbNXSjunXxEPxBx8ya_lxuE", os.path.join(ARTWORK_DIR, "hero-bg.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLKBT1cqgP6B_Xmds9avy5tAdqyJdc8ldZTq87UP6-DFT7ZtjUT8po8ntmqrsYY-_qxdXj6kJKCri81grANlzwSe3-V_x4-awuycTkUo6fHXuFDuKVfB_KxmanfxEIJXUhD121mvMd2-CJXIj29F-HZGtm3Wikm3StOIBZ4vnAdIL_5uRoWhC5om-nQ778U-QlQirekKXNrTq38GgfRtwLocWe12RQwgkKQHc5L7Vx975sDSB6jXP40qe4", os.path.join(ARTWORK_DIR, "about-artist.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLtgdHxumQWT9pjnn58hLoSiQkPPpTioD3zFsbzMzSb9AJv_8_vkU_iXMpS2ZTK6FCJH33viJymVCvqdeVy-kzLiQXvZlc8Oo0sIBgdk05E-38i7bwmC0grf9KK69mIjUsufDEXl5-HW2TZWDVkk3jVPnWm3uVr51OIxvkNXEp-F9jsXc2iekFKVOZPIhu1lu6HbAe7gEQqtPqdrbq8XqTqkaPElrtQnHnVwHnHWYZhiGC5NvDd74YQuNJY", os.path.join(ARTWORK_DIR, "piece-baqarah.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLuKNOI7gxeMTmFfCfWa28d7QMItVCF6yJnL3uU0YvqybdQ-y8JtGXprji_7GlfvMLxj0YIx7KWeAE-PnL_5nFFVP2qUHPlNjxwKW6WY_pyWHZSrupJGXJwXHWx0sm6s-JlYlzqOsDPA7hTrfqWNa85_AyvcG_sus4PwUTVCxBQdN2SqTk5wPobgRNjikYhtrMlVnu8fRKzQoZOG5XnfHrbrYCUN15Og0A-hJ_2yA6hlDqnkyx3sN01h-44", os.path.join(ARTWORK_DIR, "piece-gold-leaf.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLtZdU2Vf3qINqesYLgdGHfWPvLSxjnGsLDZ9EdCDE7zvMK_pOgjWbTxBXXkuD8JfAAbrtYIw6su2qOI03akHFZbTmorlwdk4uTUDdYRpSp16k9jCk-cqE_9eTpQIpkbXiU3CLbic6nd4bl2VhMVssDXdGk3OPw1pP4tDCo7_OSKVtfxi94cGLCy_8rKWXGUzIozGxJAP_evEIzKG5iBXzJVc1mjsLa56vSXmLR2cB381R2wTI7HPVoFWSY", os.path.join(ARTWORK_DIR, "piece-abstract.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLur9ncon3vQEREyxWuPy-vlqF8Prcha1yr02j3__a862My8qOYX-jGJDMWWCMJiqmoyReA1WqfPpb87rc3tH2-7IpW5mQbv-DAOtTTJEgOihvYENkqX9edcoOczPvIcfMzK9rXEM1XTbWzw1lhzg95-fZakFMP7fOAUhI1MdFivN4OD380gJHRyEwsaAA4ejPN7AbAbnVjHLnuRHkoPQ2G-9XF2jBKCVhfvVy6vC8QUf6S7sRHTNgwbtro", os.path.join(ARTWORK_DIR, "piece-mural.jpg")),
    
    # Gallery Page Assets
    ("https://lh3.googleusercontent.com/aida/AP1WRLuQ51r9e9Lk6EG3oQznLgOtU4RPh13OY8Zj_sZLzLTck9pjd4BSWFN8u5vkZMlwV9ssQrOjTP6ixagweHlE4oa3hZJwdGVE_6qtyxUnE7yLNnLWOEOCoyaVYtdvqdCQKaYI29Rb1FOeyP6WeF2SqkZTdl848YwZoYvR95Enf9xszpcuyNR9O-8pIg1uBXWc8V8rNpCXJsr5GCPsz1cVZhS6rD8UTB0XoX_pkXscFAiho1jUXcKDWU7WkLQ", os.path.join(ARTWORK_DIR, "piece-fatiha.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLtZ5c5AePDhK8XA1xM6xDDlZ3kAaf1pZ-FBfcma0QIHU2TG0jRlb5jalLfuhgO54JivThV5tksbyYouNCWMSxhmhurw8IrHptVc0-SJbK_qS-0Je4oNHuYI_LE6_vX6mUUFW8EvrVQWpa3kM_uT_g-5UG2RsW0A4glByM3LBc5aNSNrPw3dFvFtTBrXM5PKNuIFEAUz3DXv3BwVkNPOX8-GFja1nNXJeHITP4ChMuAKxgsDbIE0NUHDcA", os.path.join(ARTWORK_DIR, "piece-golden-breath.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLuM2HXR9fVomkG5oRjo_okYycy1RUL9B02PsrKxV5Wgi1CFOp0xOS8iTJmCWHa2vFuL_SVKNDF9MAkWN7_lNs5NFNGlOCd2lFxm8kWR845YHnAi2aVvEU5eFnX7hU7bkv8-JdkvtipULcFBZZQQ0nkTv7SmIbKHCg0FksmWQYXk8UNKe4ZDJkDjTZZ7EsCthzHTYHnM430QqLv80pZbTohSHZkjnXY4PPJZpzfk4_P-r7zmoTMExfNHyw", os.path.join(ARTWORK_DIR, "piece-lineage-study.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLu5msSaa_2JlBiJ36W6GkXGvgaqbpS_6MEFXJQCowuTGfsJNIHYpewaMi1-_ZzYw5LEzzaZjfCJNXcuP_0A2oImKZb8yv_mn9TrAZd8TTcQsoEiePxHSiP1lAF4-TrvqxXRy6oYjoDYIzjUNJn5cfBkKhR62znRp6grm7jdYApmhPEVqHK47O8ZUIT9yeK_GH-fk9W5YiYaVQlQe0wRVSvD6lYS2H2MOG95PWcOU4ZEZKaK0zW2IZwBEQ", os.path.join(ARTWORK_DIR, "piece-silent-path.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLukuLQjL6S34QFkCOJ37wSGTnWcK2SWR2LsgzEbfjk5FSRFZY28deQsW9GY5yAAV4e3I6ef3brMEyBiz79MtaUZDiJsaVPgSGMxvMGTKQUMhv2iHe88yIsotMAEWFPfqhAskWZHHftOsbQKQABSu616Z87YnzGYWXEENCk-E55MDBh9v-_xi36GleHzF_oFsbC3mBBO1FbMnk32cIp_5tjzxHVeOo9IvAnGlfQnNlxDLuh-FmtEaE326mU", os.path.join(ARTWORK_DIR, "piece-oceanic-rhythms.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLuLKhw-MJVPQ67b7yxtuGKTxnAjVfWgV4ncT5ScNpm3shT1nLjAHKJxKjkLiMJwHJx23opqZCNFamUsZ68nkb_VlBWnzUfhnZB2PXCZ_Lx8K5UknMhPYiN59FKNdujlf57Wy5e3Hd34w-4xT903zmWswJF8pHzZoFNU4YOwqzfuJMKr5lI5QtE_oTR--40KqvgU-382Hu2qDfybIlBtEMb0_HSlV8_CP66G2BmZS2m_aRaC2s9BKxTK1A", os.path.join(ARTWORK_DIR, "piece-manifestation.jpg")),
    
    # Commissions Page Assets
    ("https://lh3.googleusercontent.com/aida/AP1WRLuqYr_1F0deVDsZR67XG5EKemgovj4qim4bp6YQz5cXcIyg3WH09aNhaKdvawsHzdPkVqSseGZqJN11PiFL60orPFy39k7I7iCd_h-knqdv3CsLtB3dibib4LpUvW5E6Zic_UmoOijQOPOPVUkKCt5zefUWMWndtxUJjrhTNp2RC5_DyJwWgxlmZjNft3dVLux8SLoBXnCB04LNN3UHntBteJH4yf_PY4zKtVP1149EbEIF6g6-9SRC43s", os.path.join(ARTWORK_DIR, "commission-showcase.jpg")),
    
    # Craft Page Assets
    ("https://lh3.googleusercontent.com/aida/AP1WRLtdzObwPoj9YhmIy9YoqLM3nPlLtk8F-M5Eg9vnLEinvHADE1zVA5Bk_sCEzyWKiN-4k7gLb2zUsYqy2kE2TZSQryx7y_kFVCqvbYT8T-Ow1Ugetf62RQJDJ7r-yQ6N-AFnA07TSV2LIgXeKIMfam5MFi2vkQevbB7U0PyIcas2JlSVcTiyWCPXMulBJgZ-t84sqe4OOCuAc03EydbFytJWHEekya06g6Rt2HeVLR3a30osA__afbnWwIk", os.path.join(ARTWORK_DIR, "craft-hero.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLu3A7HQx7CViPqLx6YkP9jlvH5gtoqUXe60IiSmiXd-eSKg3h3IvC0uBeLkZ54XzVtEB_B69zzFkW5GegSqu-n6QS7kTW5-WEW_ZgiiGZgJ4agadu9xBA-Q7drw7puCfihBWlw1vqVSuPMzMaMnfl4qIbDuAFFlFlQutdX_L7sCNMhlcqeLqAre_82CKDACgnZCwGhfRPtDWT8U6FqiBWCvfcrdVrgKR0cq4cKTGrF4mncKjAE_Sdt4m-8", os.path.join(ARTWORK_DIR, "craft-ink.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLsIJQjNlq0GVimlFxhT13517YMQGfsrT1qDpEfXwMr2Ke1Uun7OTTQD16Eq0uyic1VgdhXuN1pcB2tDjse2l6SGXPs1vGBqkak-Sngd8kyHBDux1BhMyYeKX2OEJ9bqaQ8jqyMQFbIGWgO5CQbOhADBWmeChShbEc8XjEnzCdHDj5hm-czFAosd-PGd2-s_zAiqqi-DvBurOsJ0ZExmNMNob0nbg-R1ngj7pAEiXY-QLjYfRRKxdHk-eUw", os.path.join(ARTWORK_DIR, "craft-paper.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLvbJOz3E654fOcgx8ERwlvWjB1tGl-kNId52biG3ryH8ROSi9KpzY2KOyYuJy2-THY8QrcIzxzN3WVAW8FPPXxQQujCBokWy63q5S9HIlSR6mhgJr8r9w2p6J7QQ3yiJwZxePqKvpr8tTO4xjR6FJ2IyiHk-1PmfL_XBC6vl0Yad6S1pnTpn1jZxOmps_lIvR6ywbaB8cHB-rQaEW2D7JNIZJC1uBnihijOFAEytwPv-v81YdriQXQzm_M", os.path.join(ARTWORK_DIR, "script-thuluth.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLvEpOqpRI3Ypzb62F7Bqn1gED_Iv1dC68toPO7PIYmx1tuaSMGRMuO3uYIH7o8wXitGUC2xm7PM3pa5lLb4uc47_UYb3Dr0ybvh3gpQJ-X9fSkvrURcoWlw1V2JcBqYUOuLFGLJ8aT79VlalwAFYKmWI3U146mXZhiJlWqed60rWsX4BrgmNSTf7uFODHENieR-Yr356As2Z7HRpDfipaHe4Z-HyMLcjZfooD9R5Nixi8I76o2X2Hybt6E", os.path.join(ARTWORK_DIR, "script-diwani.jpg")),
    ("https://lh3.googleusercontent.com/aida/AP1WRLvRUqVxWQaAo_kDKZFMHosKhs0ykIMFtdb1V-U6tCob6aSu0LYKOmz1Vt2htprf1gqE4P7o7vLFPVlRTbVMXdMZmTRVHHgDhndIoguo-pJjsx14leCJMTSRauNDAUSyKqWlpymhXiCPmgPtm7lnW4p0nAOfqDK_x-IAPgKQOpSFecnj0Q3cWi4BZMmnJ5L6GM3JfgMFklGi1aw3WlLeP2V-xdTNbRnNpoY3p77hEkeRMRhzBMboDm997W0", os.path.join(ARTWORK_DIR, "script-naskh.jpg")),
]

# Helper headers to avoid being blocked by user agent filters
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

print(f"Starting asset download into local workspace...")
for url, path in assets:
    print(f"Downloading {url} -> {path}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(path, 'wb') as out_file:
                out_file.write(response.read())
        print(f"  [SUCCESS]")
    except Exception as e:
        print(f"  [ERROR] Failed to download {url}: {e}")

print("Asset download process completed.")
