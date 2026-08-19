pipeline {

    agent any

    environment {
        APP_NAME = 'jenkins-nodejs-app'
        BUILD_VERSION = '1.0.0'
    }

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'test', 'prod'],
            description: 'Select deployment environment'
        )
    }

    stages {

        stage('Checkout') {
            steps {
                echo '========================================'
                echo 'Checking out source code'
                echo '========================================'

                checkout scm

                sh 'git log -1 --oneline'
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '========================================'
                echo 'Installing Node.js dependencies'
                echo '========================================'

                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo '========================================'
                echo "Building ${env.APP_NAME}"
                echo '========================================'

                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo '========================================'
                echo 'Running application tests'
                echo '========================================'

                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo '========================================'
                echo "Deploying ${env.APP_NAME}"
                echo '========================================'

                echo "Version: ${env.BUILD_VERSION}"
                echo "Environment: ${params.ENVIRONMENT}"

                echo 'Deployment simulation completed'
            }
        }
    }

    post {

        always {
            echo '========================================'
            echo 'CI/CD Pipeline execution completed'
            echo '========================================'
        }

        success {
            echo '========================================'
            echo "PIPELINE SUCCESS"
            echo "Environment: ${params.ENVIRONMENT}"
            echo "Version: ${env.BUILD_VERSION}"
            echo 'Build and tests completed successfully'
            echo '========================================'
        }

        failure {
            echo '========================================'
            echo 'PIPELINE FAILED'
            echo 'Build or test failed'
            echo 'Check Jenkins Console Output'
            echo '========================================'
        }

        cleanup {
            echo 'Cleanup completed'
        }
    }
}
