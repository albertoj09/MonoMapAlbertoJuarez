import cron from 'node-cron';
import { CaseModel } from '../../data/models/case.model';
import { EmailService } from '../services/email.service';
import { generateCaseEmail } from '../templates/email.template';

const emailService = new EmailService();

export const emailJob = () => {
    cron.schedule("*/10 * * * * *", async () => {
        try {
            const cases = await CaseModel.find({ isSent: false });
            
            if (!cases.length) {
                console.log("No hay casos de virulea del mono pendientes por enviar");
                return;
            }

            console.log(`Procesando ${cases.length} casos de viruela del mono`);

            await Promise.all(
                cases.map(async (cases) => {
                    try {
                        const htmlBody = generateCaseEmail(
                            cases.genre,
                            cases.age,
                            cases.lat,
                            cases.lng
                        );

                        await emailService.sendEmail({
                            to: "albertoaja09@gmail.com",
                            subject: `Nuevo caso de viruela del mono`,
                            htmlBody: htmlBody,
                        });

                        console.log(`Email enviado para el caso con Id ${cases._id}`);

                        await CaseModel.findByIdAndUpdate(cases._id, { isSent: true });

                        console.log(`Caso de viruela del mono con Id ${cases._id} actualizado como email enviado`);
                    } catch (error) {
                        console.error(`Error al procesar el caso con Id ${cases._id}:`, error);
                    }
                })
            );
        } catch (error) {
            console.error("Error durante el envío de correos:", error);
        }
    });
};
