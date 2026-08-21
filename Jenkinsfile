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
        stage('unit Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Docker Build') {
            steps {
                sh '''
                    echo "Stopping previous application..."

                    docker stop jenkins-docker-app:latest || true

                    echo "Removing previous application..."

                    docker rm jenkins-docker-app:latest || true

                    echo "Starting new application..."

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
                    docker run -d --name jenkins-docker-app -p 3000:3000 jenkins-docker-app:latest
                '''
            }
        }

        stage('Application Verification') {
            steps {
                sh '''
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
