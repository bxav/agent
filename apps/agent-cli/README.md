# AI-Agent

AI-Agent is a Command Line Interface (CLI) application that reads a configuration file to configure and run autonomous agents. It allows you to create and manage agents with various capabilities, such as answering questions, performing calculations, and more.

## Installation

To install AI-Agent, follow these steps:

```bash
npm install -g @bxav/agent-cli
```


## Usage

To run the AI-Agent with a specific configuration file and objective, use the following command:

```bash
ai-agent ./_examples/test_agent.yaml -i "Tell me something about 2023 and calculate something difficult"
```

## Configuration

AI-Agent uses YAML configuration files to define the behavior of the autonomous agents. The configuration file consists of three main sections: `llm`, `agent`, and `tools`.

### LLM

The `llm` section defines the language model used by the agent. Currently, the supported language model is OpenAI.

Example:

```yaml
llm:
 type: OpenAI
  options:
    temperature: 0.7
    openAIApiKey: sk-xxx
```

### Agent

The `agent` section defines the type of agent and its options, such as the prefix and suffix used when processing input.

Example:

```yaml
agent:
  type: Agent
  options:
    prefix: 'Answer the following questions as best you can, but speaking as a pirate might speak. You have access to the following tools:'
    suffix: |
      Begin! Remember to speak as a pirate when giving your final answer. Use lots of "Args"
      Question: {input}
      {agent_scratchpad}
    inputVariables:
      - input
      - agent_scratchpad
```

### Tools

The `tools` section defines the additional tools that the agent can use to perform tasks. In this example, we have two tools: SerpAPI and Calculator.

Example:

```yaml
tools:
  - type: SerpAPI
    options:
      apiKey: xxx
      params:
        location: San Francisco,California,United States
        hl: en
        gl: us
  - type: Calculator
```
