import AWS from 'aws-sdk';

const OnFileUpload = (e) => {
    const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_KEY;
    const REGION = "ap-northeast-2";
    const S3_BUCKET = "mypet-upload-image";

    // AWS ACCESS KEY를 세팅합니다.
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY
    });

    // 버킷에 맞는 이름과 리전을 설정합니다.
    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET},
      region: REGION,
    });

    const file = e.target.files[0];

    // 파일과 파일이름을 넘겨주면 됩니다.
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };
    
    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        alert("이미지를 업로드 중입니다...")
      })
      .send((err) => {
        if (err) console.log(err)
      })
}
export default OnFileUpload