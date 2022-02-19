import Form from 'react-bootstrap/Form';

const currencies = [
	{ value: 'USD', description: 'USD (US$)' },
	{ value: 'EUR', description: 'EUR (€)' },
	{ value: 'JPY', description: 'JPY (¥)' },
	{ value: 'GBP', description: 'GBP (£)' },
	{ value: 'AUD', description: 'AUD (A$)' },
	{ value: 'CAD', description: 'CAD (C$)' },
	{ value: 'CHF', description: 'CHF (CHF)' },
	{ value: 'CNY', description: 'CNY (元 / ¥)' },
	{ value: 'HKD', description: 'HKD (HK$)' },
	{ value: 'NZD', description: 'NZD (NZ$)' },
	{ value: 'SEK', description: 'SEK (kr)' },
	{ value: 'KRW', description: 'KRW (₩)' },
	{ value: 'SGD', description: 'SGD (S$)' },
	{ value: 'NOK', description: 'NOK (kr)' },
	{ value: 'MXN', description: 'MXN ($)' },
	{ value: 'INR', description: 'INR (₹)' },
	{ value: 'RUB', description: 'RUB (₽)' },
	{ value: 'ZAR', description: 'ZAR (R)' },
	{ value: 'TRY', description: 'TRY (₺)' },
	{ value: 'BRL', description: 'BRL (R$)' },
];

const CurrencySelect = ({ priceCurrency = 'EUR', onSelect }) => {
	return (
		<Form.Group>
			<Form.Label className="font-75" for="currency">
				Currency
			</Form.Label>
			<Form.Control
				as="select"
				id="currency"
				onChange={e => onSelect(e.target.value)}
			>
				{currencies.map((currency, index) => (
					<option
						key={index}
						className="text-center"
						value={currency.value}
						selected={priceCurrency === currency.value}
					>
						{currency.description}
					</option>
				))}
			</Form.Control>
		</Form.Group>
	);
};

export default CurrencySelect;
