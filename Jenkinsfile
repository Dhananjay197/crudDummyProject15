pipeline {
    agent any

    environment {
        IMAGE_NAME = "angular-app"
        CONTAINER_NAME = "angular-container"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/Dhananjay197/crudDummyProject15'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                docker run -d -p 8080:80 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }
}
