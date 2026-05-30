'use server';
/**
 * @fileOverview A Genkit flow for generating AI-powered predictive alerts regarding animal populations and suggesting castration schedules for municipal administrators.
 *
 * - predictiveAlertsForAnimalManagement - A function that handles the generation of predictive alerts.
 * - PredictiveAlertsInput - The input type for the predictiveAlertsForAnimalManagement function.
 * - PredictiveAlertsOutput - The return type for the predictiveAlertsForAnimalManagement function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PredictiveAlertsInputSchema = z.object({
  municipio: z.string().describe('The name of the municipality.'),
  poblacionEstimada: z.number().describe('The estimated animal population in the municipality.'),
  esterilizados: z.string().describe('The percentage of sterilized animals in the municipality (e.g., "62%").'),
  casosAtendidos: z.number().describe('The number of animal cases attended in the municipality.'),
});
export type PredictiveAlertsInput = z.infer<typeof PredictiveAlertsInputSchema>;

const PredictiveAlertsOutputSchema = z.object({
  alert: z.string().describe('An AI-generated predictive alert and suggested castration schedules.'),
});
export type PredictiveAlertsOutput = z.infer<typeof PredictiveAlertsOutputSchema>;

export async function predictiveAlertsForAnimalManagement(input: PredictiveAlertsInput): Promise<PredictiveAlertsOutput> {
  return predictiveAlertsFlow(input);
}

const predictiveAlertsPrompt = ai.definePrompt({
  name: 'predictiveAlertsPrompt',
  input: { schema: PredictiveAlertsInputSchema },
  output: { schema: PredictiveAlertsOutputSchema },
  prompt: `You are an expert AI assistant specializing in municipal animal management and public health, focused on achieving the 2030 Sustainable Development Goals (SDGs), particularly SDG 3 (Health and Wellbeing) and SDG 11 (Sustainable Cities).

Analyze the following data for the municipality of {{{municipio}}} and generate a concise predictive alert. This alert should identify potential high-density animal population areas and suggest specific, actionable castration schedules or other interventions to efficiently allocate resources and help meet the 2030 sustainability goals, aiming for at least 70% population control.

Here is the current data:
- Municipality: {{{municipio}}}
- Estimated Animal Population: {{{poblacionEstimada}}}
- Percentage Sterilized: {{{esterilizados}}}
- Cases Attended: {{{casosAtendidos}}}

Consider the following if the percentage sterilized is below 70% or the estimated population is high relative to cases attended:
- Identify critical zones if possible (e.g., specific neighborhoods or areas based on common urban patterns).
- Recommend the urgency and type of intervention (e.g., "activate mass castration campaign within 15 days", "reinforce patrol").
- Explain the rationale briefly.

Example Output Structure:
{
  "alert": "Alta densidad de fauna urbana detectada en Barrio San Roque. Se recomienda activar campaña de castración masiva en los próximos 15 días para sostener la meta del 70% de control poblacional."
}

Generate the alert based on the provided data and context, ensuring it is actionable for municipal administrators.`,
});

const predictiveAlertsFlow = ai.defineFlow(
  {
    name: 'predictiveAlertsFlow',
    inputSchema: PredictiveAlertsInputSchema,
    outputSchema: PredictiveAlertsOutputSchema,
  },
  async (input) => {
    const { output } = await predictiveAlertsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate predictive alert.');
    }
    return output;
  }
);
