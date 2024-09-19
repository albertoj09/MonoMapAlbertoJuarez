import { envs } from "../../config/envs.plugin";

export function generateCaseEmail(genre: string, age: number, lat: number, lng: number): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng)
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alerta de Salud Pública - Informe de Incidente</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
            
            body {
                font-family: 'Roboto', Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #3498db;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 700;
            }
            .content {
                padding: 30px;
            }
            .alert-banner {
                background-color: #e74c3c;
                color: white;
                padding: 10px;
                text-align: center;
                font-weight: 700;
                font-size: 16px;
            }
            .info-box {
                background-color: #f9f9f9;
                border-left: 4px solid #3498db;
                padding: 15px;
                margin-bottom: 20px;
            }
            .info-item {
                margin-bottom: 10px;
            }
            .info-label {
                font-weight: 700;
                color: #2c3e50;
            }
            .info-value {
                color: #34495e;
            }
            .map-container {
                margin-top: 20px;
                text-align: center;
            }
            .map-img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .footer {
                background-color: #34495e;
                color: #ecf0f1;
                padding: 15px;
                text-align: center;
                font-size: 12px;
            }
            .disclaimer {
                font-style: italic;
                color: #7f8c8d;
                margin-top: 20px;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Alerta de Salud Pública</h1>
            </div>
            <div class="alert-banner">
                Informe de Incidente - Acción Requerida
            </div>
            <div class="content">
                <div class="info-box">
                    <div class="info-item">
                        <span class="info-label">Género del Paciente:</span>
                        <span class="info-value">${genre}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Edad del Paciente:</span>
                        <span class="info-value">${age} años</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Coordenadas:</span>
                        <span class="info-value">Lat: ${lat}, Lon: ${lng}</span>
                    </div>
                </div>
                <p>Se ha reportado un caso que requiere atención inmediata. Por favor, revise la información proporcionada y tome las medidas necesarias según los protocolos establecidos.</p>
                <div class="map-container">
                    <img class="map-img" src="${mapboxUrl}" alt="Ubicación del Incidente"/>
                </div>
                <p class="disclaimer">Este es un mensaje automático. No responda a este correo electrónico. Para obtener más información, contacte a su unidad de salud local.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Sistema de Alerta de Salud Pública. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number) => {
    const accessToken = envs.MAPBOX_ACCESS_TOKEN;
    const zoom = 13;
    const width = 600;
    const height = 400;

    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-hospital+3498db(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}@2x?access_token=${accessToken}`;
}