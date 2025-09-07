# 🚀 Projeto de Microserviços com Docker e Kubernetes

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/) 
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Minikube](https://img.shields.io/badge/Minikube-7F52FF?style=flat&logo=minikube&logoColor=white)](https://minikube.sigs.k8s.io/docs/start/)

---

✨ Este projeto demonstra uma aplicação em **arquitetura de microserviços**, com:  
- 🖥️ **Frontend** simples  
- ⚙️ **Backend 1**  
- 🛠️ **Backend 2** (não acessível direto do navegador)  

👉 O frontend possui **dois botões**:  
- 🔹 Um chama diretamente o **Backend 1**  
- 🔹 O outro chama o **Backend 1**, que por sua vez aciona o **Backend 2**  

O projeto funciona tanto com **Docker Compose** quanto com **Kubernetes/Minikube**.

---

## ⚙️ Configurando o projeto

1. Clone o repositório na sua máquina.

2. Na raiz do projeto, crie um arquivo `.env-docker` com o seguinte conteúdo:  
BACKEND1_URL=http://localhost:4001/  
BACKEND2_URL=http://localhost:4001/test  

> Esses valores indicam onde o frontend encontrará os backends.

3. Dentro da pasta `backend1`, crie um arquivo `.env` com o seguinte conteúdo:  
PORT=4001  
BACKEND2_URL="http://backend2:4002/test"  

> Isso define a porta do **Backend 1** e o endereço do **Backend 2** dentro da rede de containers, pois ele não é acessível diretamente pelo navegador.

---

## 🐳 Rodando com Docker Compose

Suba todos os containers com:  

| Comando | Descrição |
|---------|-----------|
| `docker compose --env-file ./.env-docker up --build -d` | Sobe todos os serviços em background |

Para subir os containers, execute:  
docker compose --env-file ./.env-docker up --build -d  

> Todos os containers serão iniciados em background. O frontend poderá acessar os backends via os botões.

---

## ☸️ Rodando com Kubernetes (Minikube)

Certifique-se de ter o Minikube instalado: [Minikube Docs](https://minikube.sigs.k8s.io/docs/start/)

1. Inicie o Minikube:  
minikube start

2. Configure o Docker do Minikube:  
eval $(minikube docker-env)

3. Construa as imagens da aplicação:  
docker build --no-cache -t frontend ./frontend  
docker build --no-cache -t backend1 ./backend1  
docker build --no-cache -t backend2 ./backend2

---

## 📦 Subindo os microserviços

Siga a ordem recomendada para os deployments:

1. **Backend 2:**  
kubectl apply -f backend2/k8s/deployment-backend2.yml

2. **ConfigMap do Backend 1:**  
kubectl apply -f backend1/k8s/backend1-config.yml

3. **Backend 1:**  
kubectl apply -f backend1/k8s/deployment-backend1.yml

4. **Habilitar Ingress:**  
minikube addons enable ingress

4. **Habilitar Ingress:**  
minikube addons enable ingress

5. **Adicionar mapeamento local para o frontend:**  
echo "$(minikube ip) frontend.local" | sudo tee -a /etc/hosts

6. **ConfigMap do Frontend:**  
kubectl apply -f frontend/k8s/frontend-config.yml

7. **Frontend:**  
kubectl apply -f frontend/k8s/deployment-front.yml  
kubectl apply -f frontend/k8s/ingress-front.yml

---

## ✅ Testando

Após todos os deployments:  
curl http://frontend.local  

Ou abra no navegador: `http://frontend.local` e teste os botões.

---

## 📌 Observações

- ⚠️ **Backend 2** não é acessível pelo navegador; o frontend chama **Backend 1**, que encaminha a requisição.  
- 🔹 Construir imagens dentro do Minikube é necessário para que o cluster enxergue as imagens locais.  
- 🔧 Os arquivos `.env-docker` e `.env` internos garantem que os endpoints corretos sejam usados em Docker Compose e Kubernetes.

---

## 💡 Dicas

- Use **Docker Compose** para testes rápidos e desenvolvimento local.  
- Use **Minikube/Kubernetes** para simular um ambiente de produção em microserviços.  
- Você pode adicionar **mais microserviços** seguindo a mesma lógica de configuração e deployments.

---

## 💡 Possíveis Erros

1. **Deployment sem imagem construída**  

Um erro bastante comum ocorre quando você tenta criar o deployment de um microserviço antes de construir a imagem correspondente dentro do Docker do Minikube.

O comando de kubectl apply pode ser aceito, mas ao inspecionar o pod, você verá algo como:

(Imagem do erro)

Isso acontece porque, embora o comando de deployment seja executado com sucesso, o Kubernetes não encontra a imagem necessária para iniciar o pod, portanto ele não consegue subir.

2. **Deployment sem ConfigMap criado**  

Outro erro frequente é tentar criar um deployment antes de criar o ConfigMap, especialmente para os microserviços backend1 e frontend.

(Imagem do erro)

O Kubernetes depende dos valores definidos no ConfigMap para configurar corretamente o pod. Se o ConfigMap não existir, o pod não consegue inicializar, gerando falha no deployment.

---

3. **Container com comando de inicialização incorreto**  

Um erro simples de simulação é modificar o CMD no Dockerfile de algum backend para apontar para um arquivo que não existe, por exemplo:

CMD ["node", "fake.js"]

(Imagem do erro)

Ao tentar subir o deployment, o Kubernetes cria o pod, mas o container não consegue iniciar e entra em estado CrashLoopBackOff. Esse erro acontece porque o comando de inicialização falha imediatamente, impedindo o pod de ficar em execução.

---

