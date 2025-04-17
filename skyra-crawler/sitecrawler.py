from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
import logging

def crawl_site(url, headless=True):
    """
    Crawls the given URL and returns a set of unique links.
    Args:
        url (str): The URL to crawl.
        headless (bool, optional): Whether to run Chrome in headless mode. Defaults to True.
    Returns:
        set: A set of unique links found on the site.
    """

    options = Options()
    options.headless = headless

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    all_links = set()

    try:
        driver.get(url)
        time.sleep(3)  # Initial wait

        while True:
            links = driver.find_elements(By.TAG_NAME, 'a')
            for link in links:
                href = link.get_attribute('href')
                if href:
                    all_links.add(href)

            try:
                next_button = driver.find_element(By.ID, 'btnNext')  # Adjust ID if needed
                is_disabled = not next_button.is_enabled() or 'disabled' in next_button.get_attribute('class').lower()

                if is_disabled:
                    logging.info("Reached the end of pagination.")
                    break

                next_button.click()
                time.sleep(3)  # Wait for next page

            except Exception as e:
                logging.info(f"Could not find or click Next button: {e}")
                break

    except Exception as e:
        logging.error(f"Error occurred while crawling {url}: {e}")
    finally:
        driver.quit()

    return all_links
