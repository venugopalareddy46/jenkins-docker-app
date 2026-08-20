pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node and NPM') {
            steps {
                echo 'Configuring official NodeSource repositories for Node 22 (LTS)...'
                // Safely configures the system to find Node 22
                sh 'curl -fsSL https://nodesource.com | sudo -E bash -'
                
                echo 'Installing Node.js and NPM system-wide...'
                sh 'sudo apt-get install -y nodejs'
                
                echo 'Verifying tool installations:'
                sh 'node -v'
                sh 'npm -v'
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