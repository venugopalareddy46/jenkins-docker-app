pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

    
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
        stage('unit tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('junit tests') {
            steps {
                junit 'test-results.xml'
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