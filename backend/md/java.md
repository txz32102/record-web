# No1

UploadTCPClient.java


```java
package No1;
import java.io.*;
import java.net.*;
public class UploadTCPClient {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
     String dir="D:\\";
     String fname="bird.jpg";
     
    	 try{Socket socket=new Socket("localhost",10001);
    	 OutputStream out=socket.getOutputStream();
		DataOutputStream dos=new DataOutputStream(out);
		FileInputStream fis=new FileInputStream(dir+fname);
		BufferedInputStream bis=new BufferedInputStream(fis);
		dos.writeUTF(fname);
		dos.writeLong(new File(dir+fname).length());
		byte[] buffer=new byte[1024];
		int l;
		System.out.println("连接到服务器端，开始文件上传！");
		while((l=bis.read(buffer))!=-1) {
			out.write(buffer,0,l);
		}
		out.flush();
		//out.close();
		InputStream in=socket.getInputStream();
		DataInputStream dis=new DataInputStream(in);
		String rec=dis.readUTF();
		System.out.println(rec);
		dis.close();
		in.close();
		socket.close();
    	}catch(IOException e) {
   		 System.out.println("处理客户请求失败"+e.getMessage());
   			}
}
}
```


```java

```