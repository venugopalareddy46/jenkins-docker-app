pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Node.js application...'

                sh '''
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests...'

                sh '''
                    npm test
                '''
            }
        }
    }

    post {

        success {
            echo '''
========================================
       JENKINS PIPELINE SUCCESS
========================================
Checkout : SUCCESS
Build    : SUCCESS
Test     : SUCCESS
Result   : SUCCESS
========================================
'''
        }

        failure {
            echo '''
========================================
       JENKINS PIPELINE FAILED
========================================
Please check the Jenkins Console Output.
========================================
'''
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}