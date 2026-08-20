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
        stage('JUnit Test Reports') {
            steps {
                junit 'test-results.xml'
            }
        }
        stage('Credentials Test') {
        steps {
            withCredentials([
                string(
                    credentialsId: 'jenkins-secret',
                    variable: 'DEMO_SECRET'
                )
            ]) {
                sh '''
                    echo "Credential ID is configured successfully"
                    echo "Secret length: ${#DEMO_SECRET}"
                '''
            }
        }
    }
        
    }

    post {
        success {
            echo 'Jenkins Pipeline completed successfully!'
        }

        failure {
            echo 'Jenkins Pipeline failed!'
        }
    }
}