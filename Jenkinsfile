pipeline {
    agent any

    stages {    
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    echo "Stopping previous container if it exists..."
                    docker stop jenkins-docker-app || true

                    echo "Removing previous container..."
                    docker rm jenkins-docker-app || true

                    echo "Building new Docker image..."
                    docker build -t jenkins-docker-app:latest .
                '''
            }
        }

        stage('Docker Images') {
            steps {
                sh 'docker images'
            }
        }

        stage('Docker Run') {
            steps {
                sh '''
                    echo "Starting new container container instance..."
                    docker run -d --name jenkins-docker-app -p 3000:3000 jenkins-docker-app:latest
                '''
            }
        }

        stage('Application Verification') {
            steps {
                sh '''
                    echo "Waiting for app initialization..."
                    sleep 5
                    curl -f http://localhost:3000
                '''
            }
        }
    }

    post {
        success {
            echo 'Docker CI pipeline completed successfully!'
        }
        failure {
            echo 'Docker CI pipeline failed!'
        }
    }
}
