
export const deviceTypes = [
    {
        value: "DHT22",
        label: "DHT22",
        measures:[
            {
                variable: "temperature",
                unit: "C",
            },
            {
                variable: "humidity",
                unit: "%",
            }
        ],
        type: "digital"
    },
    {
        value: "MQ135",
        label: "MQ135",
        measures:[
            {
                variable: "gas intensity",
                unit: "ppm",
            }
        ],
        type: "both"
    },
    {
        value: "GYML8511",
        label: "GYML8511",
        measures:[
            {
                variable: "uv",
                unit: "mW/cm2",
            }
        ],
        type: "analog"
    }
]