from dotenv import load_dotenv
import os
import google.generativeai as genai
load_dotenv()
import base64

api_key = os.getenv('GEMINI_API_KEY')

genai.configure(api_key=api_key)

def get_llm_response(prompt: str) -> str:
    try:
        model = genai.GenerativeModel(model_name="gemini-2.0-flash")
        response = model.generate_content(
            contents=[{"parts": [{"text": prompt}]}]
        )
        return response.text
    except Exception as e:
        print(f"An error occurred: {e}")

def get_llm_response_with_image(prompt: str, image_path: str) -> str:
    print("yo inside get_llm_response_with_image")
    try:
        with open(image_path, "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
            model = genai.GenerativeModel(model_name="gemini-2.0-flash")
            response = model.generate_content(
                contents=[
                    {
                        "parts": [
                            {
                                "inline_data": {
                                    "mime_type": "image/jpeg",
                                    "data": encoded_image
                                }
                            },
                            {
                                "text": prompt
                            }
                        ]
                    }
                ]
            )
            print("llm response", response.text)
            return response.text
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
