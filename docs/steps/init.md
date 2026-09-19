# Initialize the Project

## Prerequisites

### pnpm

```bash
brew install pnpm
pnpm --version
echo 'export PATH="~/Library/pnpm/bin:$PATH"' >> ~/.zshrc
```

### Nest JS

```bash
pnpm add -g @nestjs/cli
nest --version
```

## Initialize the Project

```bash
nest new .
```

```terminaloutput                                                                                                                                                                           ✔ 
✨  We will scaffold your app in a few seconds..

✔ Which package manager would you ❤️  to use? pnpm
✔ Would you like to set up @nestjs/observe (distributed tracing, auto-correlated logs, metrics and alarms - free for 300k events/month, https://observe.nestjs.com)? No
✔ Which module system would you like to use? ESM (ES Modules)         [ with vitest ]
```
