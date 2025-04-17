from fastapi import FastAPI, HTTPException
from pydantic import HttpUrl, BaseModel

from content import get_screenshot_path
from sitecrawler import crawl_site
from llm_helper import get_llm_response, get_llm_response_with_image
import logging
import json
app = FastAPI()

class FetchContentRequest(BaseModel):
    url: HttpUrl

class FetchContentResponse(BaseModel):
    content: str


@app.post("/fetch-content/", response_model=FetchContentResponse)
async def fetch_content(request: FetchContentRequest):
    """
    Endpoint to fetch the content of a webpage.
    """
    try:
        links = crawl_site(str(request.url))
        prompt = "Get one collections page link and one product page link and return a json string without any formatting with the keys as 'collections' and 'products' from the following links: " + str(links)
        response = get_llm_response(prompt)
        a = response.split("\n")
        urls = json.loads(a[1])
        urls["base_url"] = str(request.url)
        urls["landing_page"] = str(request.url)
        content = {}
        for type, url in urls.items():
            content[type] = get_screenshot_path(url)
        prompt_for_content = {
            "collections": "Can you identify if a heart button with metadata like 'Wishlist', 'My Wishlist' or similar is present and clearly visible as a clickable element in the image that I'm attaching ",
            "products": "Can you identify if there is a button or text element with labels like 'Add to Wishlist', 'Save', or a heart icon accompanied by text in the image that I'm attaching",
            "base_url": "Can you identify if specific text like 'Wishlist', 'My Wishlist' or similar is present and clearly visible as a clickable element in the image that I'm attaching",
            "landing_page": "Can you identify if a heart icon (or a similar 'save' icon) is present on each product listing, typically overlaid on the product image or appearing alongside other quick actions and clearly visible as a clickable element in the image that I'm attaching",
        }

        for type, prompt in prompt_for_content.items():
            response = get_llm_response_with_image(prompt, content[type])
            print(response)

        return FetchContentResponse(content=response)
    except Exception as e:
        logging.error(f"Error fetching content: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")

