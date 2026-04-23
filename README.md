✨ Part of the Magic Window series:

# Get IMG color palette
Gets the color palette of a given image URL and returns the result via stdout.

# Quick Start

Run the program in a command line, then enter a message like this: 
```
{"data": "http://localhost:6604", "type":"url", "request_id":"123"}
```

To get a response like this:
```
{
  "request_id": "123",
  "palettes": {
    "quantized": [
      "#aec0f2",
      "#fc8245",
      "#e7b8a8",
      "#5fb153",
      "#41372f",
      "#e82215",
      "#ffd34b",
      "#eb9d98",
      "#312e39",
      "#904311"
    ],
    "vibrant": {
      "vibrant": "#f77258",
      "light_vibrant": "#fcb522",
      "muted": "#896d8c",
      "dark_muted": "#312e39",
      "light_muted": "#e7b8a8"
    }
  }
}
```
Note: Request ID is optional.
