const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const fakeLLMResponse = () => ({
  utility: '',
  federal: '30% tax credit',
  state: '',
  chargerType: 'Level 2',
  useCase: 'Workplace'
});

const refineKey = (key, attempts = 0) => {
  if (attempts >= 3) return 'NA';
  const mockDatabase = {
    utility: 'PG&E rebate $3000',
    state: 'CA Clean Fuel Reward'
  };
  return mockDatabase[key] || '';
};

const summarizeJSON = (data) => {
  return `This site uses a ${data.chargerType} charger for ${data.useCase}. Federal incentive: ${data.federal}. State incentive: ${data.state}. Utility program: ${data.utility}.`;
};

app.post('/get-incentives', async (req, res) => {
  let result = fakeLLMResponse();

  for (const key in result) {
    let attempts = 0;
    while (!result[key] && attempts < 3) {
      result[key] = refineKey(key, attempts);
      attempts++;
    }
    if (!result[key]) result[key] = 'NA';
  }

  const summary = summarizeJSON(result);
  res.json({ result, summary });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
