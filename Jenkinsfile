pipeline {
    // Declare variables that will be used by the later stages
    environment {
			DOCKERHUB_REGISTRY = "guninjain/Jahazbooker"
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

                    git branch: 'main',
                    credentialsId: 'github_pat',
                    url: 'https://github.com/pratyu2364/Frontend.git'

                    sh 'ls -la'
				}
			}

    }
}
