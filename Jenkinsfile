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
        stage('Test Reports') {
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