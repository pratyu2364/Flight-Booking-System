pipeline {
    // Declare variables that will be used by the later stages
    environment {
			DOCKERHUB_REGISTRY = "guninjain/jahazbooker"
			DOCKERHUB_CREDENTIALS = credentials('my_docker_hub_credentials')
    }
    
    agent any 
    
    stages {
        
			stage('Git Pull') {
				steps {
				// credentials are required because its a private repository
				git branch: 'main',
                    credentialsId: 'github_pat',
                    url: 'https://github.com/Gunin199/JahazBooker.git'
				}
			}
			stage('Maven build and test'){
			    steps{
			        sh "cd JB_backend && mvn clean install"
			    }
			}
			stage('Build backend image'){
			    steps{
			        sh "docker build -t $DOCKERHUB_REGISTRY-backend:latest JB_backend/"
			    }
			}
			stage('Build frontend image'){
			    steps{
			        sh "docker build -t $DOCKERHUB_REGISTRY-frontend:latest JB_Frontend/"
			    }
			}
						stage('Login to Docker Hub') {
				steps {
					sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
				}
			}

			stage('Push Backend Docker Image to Docker Hub') {
			  steps {
			    sh "docker push $DOCKERHUB_REGISTRY-backend:latest"
			  }
			}

			stage('Push Frontend Docker Image to Docker Hub') {
				steps {
					sh "docker push $DOCKERHUB_REGISTRY-frontend:latest"
				}
			}
        
			stage('Removing Docker Images from Local') {
				steps {
					sh "docker rmi $DOCKERHUB_REGISTRY-frontend:latest"
					sh "docker rmi $DOCKERHUB_REGISTRY-backend:latest"
				}
			}
        
			// Ansible Deploy to remote server (managed host)
			stage('Ansible Deploy') {
				steps {
					ansiblePlaybook becomeUser: 'null',
					colorized: true,
					installation: 'Ansible',
					inventory: 'inventory',
					playbook: 'playbook.yml',
					vaultCredentialsId: 'my-ansible-vault-credentials',
					extraVars: [
                        			passwd: readFile('passwd.yml')
                    			]
					
				}
			
            }
		}
}
