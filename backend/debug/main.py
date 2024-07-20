from fastapi import FastAPI
from fastapi import Request
import os
import uvicorn

app = FastAPI()

@app.post("/")
async def root(data: Request):
    try:
        res = await data.json()
    except Exception as ex:
        res = str(ex)
    return res


if __name__ == "__main__":
    prog = os.path.basename(__file__).replace(".py","")
    uvicorn.run("%s:app" % prog, host="127.0.0.1", port=5000, log_level="debug",reload=True)  