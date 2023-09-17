import cohere

class Prompter():
    def __init__(self, co: cohere.Client, logger) -> None:
        self.co = co
        self.logger = logger

    def prompt(self,
            prompt,
            model='command',
            max_tokens=878,
            temperature=0.2,
            k=0,
            stop_sequences=[],
            return_likelihoods='NONE'
        ):
        
        self.logger.debug(f"received prompt: '{prompt}'")

        response = self.co.generate(
            model =model,
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=temperature,
            k=k,
            stop_sequences=stop_sequences,
            return_likelihoods=return_likelihoods,
        )

        ret = response.generations[0].text

        return ret