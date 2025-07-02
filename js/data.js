var APP_DATA = {
  "scenes": [
    {
      "id": "0-panorama-1",
      "name": "Panorama (1)",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "yaw": 0.18220899054011142,
        "pitch": 0.3994464886007698,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.040798488354909,
          "pitch": 0.04479169883232359,
          "rotation": 0,
          "target": "1-panorama_1-1"
        },
        {
          "yaw": -1.485940073748118,
          "pitch": -0.01623571162345705,
          "rotation": 0,
          "target": "2-panorama_2-1"
        },
        {
          "yaw": -0.06750731293839252,
          "pitch": 0.22241102815577918,
          "rotation": 0,
          "target": "3-panorama_3-1"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-panorama_1-1",
      "name": "Panorama_1 (1)",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.8561424702525571,
          "pitch": 0.1438966240907007,
          "rotation": 0,
          "target": "3-panorama_3-1"
        },
        {
          "yaw": -0.17325274176724115,
          "pitch": 0.04230106502491893,
          "rotation": 0,
          "target": "0-panorama-1"
        },
        {
          "yaw": 0.05687252326863934,
          "pitch": -0.021269196956485104,
          "rotation": 0,
          "target": "2-panorama_2-1"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-panorama_2-1",
      "name": "Panorama_2 (1)",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.0402209213679363,
          "pitch": -0.0008415125248362187,
          "rotation": 0,
          "target": "0-panorama-1"
        },
        {
          "yaw": -1.2351816559162838,
          "pitch": -0.03227813127775292,
          "rotation": 0,
          "target": "1-panorama_1-1"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-panorama_3-1",
      "name": "Panorama_3 (1)",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.9089239736452157,
          "pitch": -0.4713850575058771,
          "rotation": 0,
          "target": "0-panorama-1"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true,
    "viewControlButtons": true
  }
};
