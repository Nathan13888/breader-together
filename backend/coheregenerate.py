import cohere
co = cohere.Client('giq48Cw7L75PIlFLPagoOo3rqJWadtWJ9BuTLu6C') # This is your trial API key
response = co.generate(
  model='command',
  prompt='Give me a recipe using broccoli, ground meat, asparagus and quinoa! Please introduce the recipe with an appetizing name and taste description, like at a restaurant! Please also present the ingredients in bullet points, and the steps to make the recipe in a numbered list. \n',
  max_tokens=878,
  temperature=2,
  k=0,
  stop_sequences=[],
  return_likelihoods='NONE')
print('Prediction: {}'.format(response.generations[0].text))

# could replace ingredient names with r