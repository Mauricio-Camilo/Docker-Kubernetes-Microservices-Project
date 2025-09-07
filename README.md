# 🚀 Microservices Project with Docker and Kubernetes

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/) 
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Minikube](https://img.shields.io/badge/Minikube-7F52FF?style=flat&logo=minikube&logoColor=white)](https://minikube.sigs.k8s.io/docs/start/)

---

✨ This project demonstrates an application using a **microservices architecture**, with:  
- 🖥️ **Simple Frontend**  
- ⚙️ **Backend 1**  
- 🛠️ **Backend 2** (not directly accessible from the browser)  

👉 The frontend has **two buttons**:  
- 🔹 One calls **Backend 1** directly  
- 🔹 The other calls **Backend 1**, which in turn triggers **Backend 2**  

The project works both with **Docker Compose** and **Kubernetes/Minikube**.

---

## ⚙️ Project Setup

1. Clone the repository to your machine.

2. In the project root, create a `.env-docker` file with the following content:  
BACKEND1_URL=http://localhost:4001/  
BACKEND2_URL=http://localhost:4001/test  

> These values indicate where the frontend will find the backends.

3. Inside the `backend1` folder, create a `.env` file with the following content:  
PORT=4001  
BACKEND2_URL="http://backend2:4002/test"  

> This sets the port for **Backend 1** and the address of **Backend 2** within the container network, as it is not directly accessible from the browser.

---

## 🐳 Running with Docker Compose

Start all containers with:  

| Command | Description |
|---------|-----------|
| `docker compose --env-file ./.env-docker up --build -d` | Starts all services in the background |

To bring up the containers, run:  
docker compose --env-file ./.env-docker up --build -d  

> All containers will start in the background. The frontend can access the backends via the buttons.

To access the application, open in the browser:

http://localhost:3000

(image)

---

## ☸️ Running with Kubernetes (Minikube)

Make sure Minikube is installed: [Minikube Docs](https://minikube.sigs.k8s.io/docs/start/)

1. Start Minikube:  
minikube start

2. Configure Minikube’s Docker:  
eval $(minikube docker-env)

3. Build the application images:  
docker build --no-cache -t frontend ./frontend  
docker build --no-cache -t backend1 ./backend1  
docker build --no-cache -t backend2 ./backend2

---

## 📦 Deploying the Microservices

Follow the recommended order for deployments:

1. **Backend 2:**  
kubectl apply -f backend2/k8s/deployment-backend2.yml

2. **Backend 1 ConfigMap:**  
kubectl apply -f backend1/k8s/backend1-config.yml

3. **Backend 1:**  
kubectl apply -f backend1/k8s/deployment-backend1.yml

4. **Enable Ingress:**  
minikube addons enable ingress

5. **Add local mapping for the frontend:**  
echo "$(minikube ip) frontend.local" | sudo tee -a /etc/hosts

6. **Frontend ConfigMap:**  
kubectl apply -f frontend/k8s/frontend-config.yml

7. **Frontend:**  
kubectl apply -f frontend/k8s/deployment-front.yml  
kubectl apply -f frontend/k8s/ingress-front.yml

---

## ✅ Testing

After all deployments:  
curl http://frontend.local  

Or open in the browser: `http://frontend.local` and test the buttons.

---

## 📌 Notes

- ⚠️ **Backend 2** is not accessible from the browser; the frontend calls **Backend 1**, which forwards the request.  
- 🔹 Building images inside Minikube is necessary for the cluster to see local images.  
- 🔧 The `.env-docker` and internal `.env` files ensure that the correct endpoints are used in Docker Compose and Kubernetes.

---

## 💡 Tips

- Use **Docker Compose** for quick tests and local development.  
- Use **Minikube/Kubernetes** to simulate a production microservices environment.  
- You can add **more microservices** following the same configuration and deployment logic.

---

## ❗ Possible Errors

1. **Deployment without built image**  

    A common error occurs when you try to create a microservice deployment before building the corresponding image inside Minikube’s Docker.

    The `kubectl apply` command may be accepted, but inspecting the pod shows something like:

    (Error image)

    This happens because, even though the deployment command succeeds, Kubernetes cannot find the required image to start the pod, so it fails to launch.

2. **Deployment without ConfigMap created**  

    Another common mistake is creating a deployment before creating the ConfigMap, especially for backend1 and frontend microservices.

    (Error image)

    Kubernetes relies on the values defined in the ConfigMap to correctly configure the pod. If the ConfigMap does not exist, the pod cannot initialize, causing deployment failure.

---

3. **Container with incorrect startup command**  

    A simple simulation error is modifying the CMD in a backend Dockerfile to point to a non-existent file, for example:

CMD ["node", "fake.js"]

    (Error image)

    When attempting to deploy, Kubernetes creates the pod, but the container cannot start and enters CrashLoopBackOff. This happens because the startup command fails immediately, preventing the pod from running.

---
