# stu1

UploadTCPClient.java

```java
package stu1;

import java.io.*;
import java.net.*;

public class UploadTCPClient {
    public static void main(String[] args) {
        try {
            // Create client socket and connect to server
            Socket socket = new Socket("localhost", 10001);
            System.out.println("Connected to server, starting file upload!");

            // Get output stream
            OutputStream outputStream = socket.getOutputStream();
            DataOutputStream dataOutputStream = new DataOutputStream(outputStream);

            // Specify the file to upload
            File file = new File("C:\\Users\\13816\\Desktop\\duanxueqi\\java\\stu1\\debug\\client\\bird.jpg");
            FileInputStream fileInputStream = new FileInputStream(file);

            // Send file name and file size
            dataOutputStream.writeUTF(file.getName());
            dataOutputStream.writeLong(file.length());
            dataOutputStream.flush();

            // Read file content and send to server
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                dataOutputStream.write(buffer, 0, bytesRead);
            }

            // Close file stream
            fileInputStream.close();
            dataOutputStream.flush();

            // Receive response from server
            InputStream inputStream = socket.getInputStream();
            DataInputStream dataInputStream = new DataInputStream(inputStream);
            String response = dataInputStream.readUTF();
            System.out.println("Server response: " + response);

            // Close streams and socket connection
            dataInputStream.close();
            dataOutputStream.close();
            socket.close();

            System.out.println("File upload complete!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

UploadTCPServer.java


```java
package stu1;

import java.io.*;
import java.net.*;

public class UploadTCPServer {
    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(10001);
            System.out.println("服务器启动，等待客户端连接...");

            while (true) {
                Socket socket = serverSocket.accept();
                System.out.println("客户端已连接: " + socket.getInetAddress());

                handleClient(socket);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (serverSocket != null && !serverSocket.isClosed()) {
                try {
                    serverSocket.close();
                    System.out.println("服务器已关闭");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private static void handleClient(Socket socket) {
        try {
            // 创建保存上传文件的目录
            File uploadDir = new File("C:\\Users\\13816\\Desktop\\duanxueqi\\java\\stu1\\debug\\server");
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // 获取输入流
            DataInputStream dataInputStream = new DataInputStream(socket.getInputStream());

            // 读取文件名和文件大小
            String fileName = dataInputStream.readUTF();
            long fileSize = dataInputStream.readLong();
            File file = new File(uploadDir, fileName);
            FileOutputStream fileOutputStream = new FileOutputStream(file);

            // 读取文件内容并保存到本地
            byte[] buffer = new byte[4096];
            int bytesRead;
            long totalBytesRead = 0;
            while (totalBytesRead < fileSize && (bytesRead = dataInputStream.read(buffer)) != -1) {
                fileOutputStream.write(buffer, 0, bytesRead);
                totalBytesRead += bytesRead;
            }

            // 关闭文件流
            fileOutputStream.close();

            // 向客户端发送上传成功消息
            DataOutputStream dataOutputStream = new DataOutputStream(socket.getOutputStream());
            dataOutputStream.writeUTF("上传成功");
            dataOutputStream.flush();

            // 关闭流和Socket连接
            dataInputStream.close();
            dataOutputStream.close();
            socket.close();

            System.out.println("文件上传成功: " + file.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```


# stu2

UDPClient.java

```java
package stu2;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Scanner;
import java.io.*;

public class UDPClient {
    public static void main(String[] args) {
    	System.out.println("请发送消息给localhost, 请输入消息：");
        DatagramSocket socket = null;
        try {
            // 创建DatagramSocket对象
            socket = new DatagramSocket();
            InetAddress address = InetAddress.getByName("127.0.0.1");
            int port = 8000;

//            Scanner scanner = new Scanner(System.in);
            while (true) {
                System.out.print("输入消息: ");
//                String message = scanner.nextLine();
                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
                String message = br.readLine();
                byte[] buffer = message.getBytes();

                // 创建DatagramPacket对象，用于发送数据报
                DatagramPacket packet = new DatagramPacket(buffer, buffer.length, address, port);
                // 发送数据报
                socket.send(packet);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (socket != null) {
                socket.close();
            }
        }
    }
}

```

UDPServer.java
```java
package stu2;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.io.*;

public class UDPServer {
    public static void main(String[] args) {
        DatagramSocket socket = null;
        try {
            // 创建DatagramSocket对象并绑定到8000端口
            socket = new DatagramSocket(8000);
            byte[] buffer = new byte[1024];
            System.out.println("这里是服务器，等待接受客户端信息...");

            while (true) {
                // 创建DatagramPacket对象，用于接收数据报
                DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
                // 接收数据报
                socket.receive(packet);

                // 将接收到的数据转换为字符串并打印
                // 从0开始转换到结尾
                String received = new String(packet.getData(), 0, packet.getLength());
                System.out.println("服务器已接收到消息： " + received);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (socket != null) {
                socket.close();
            }
        }
    }
}

```


# stu3

Account.java

```java
package stu3;

public class Account {
    private int balance = 0;

    public synchronized void deposit(int amount) {
        balance += amount;
        System.out.println("Father deposited: " + amount + ", Current balance: " + balance);
        notify();
    }

    public synchronized void withdraw(int amount) {
        while (balance < amount) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        balance -= amount;
        System.out.println("Son withdrew: " + amount + ", Current balance: " + balance);
    }

    public static void main(String[] args) {
        Account account = new Account();

        Thread father = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                account.deposit(100);
                try {
                    Thread.sleep(1000); // 模拟存钱时间间隔
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread son = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                account.withdraw(100);
                try {
                    Thread.sleep(1500); // 模拟取钱时间间隔
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        father.start();
        son.start();
    }
}

```


# stu4

```java
package stu4;

import java.io.*;
import java.net.*;

public class SocketClient {
    public static void main(String[] args) {
        Socket socket = null;
        BufferedReader in = null;
        PrintWriter out = null;
        BufferedReader stdIn = null;

        try {
            socket = new Socket("localhost", 8000);
            System.out.println("Connected to server");

            in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            out = new PrintWriter(socket.getOutputStream(), true);
            stdIn = new BufferedReader(new InputStreamReader(System.in));

            String userInput;
            while ((userInput = stdIn.readLine()) != null) {
                out.println(userInput);
                System.out.println("Server: " + in.readLine());
                if ("bye".equalsIgnoreCase(userInput)) {
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (in != null) in.close();
                if (out != null) out.close();
                if (stdIn != null) stdIn.close();
                if (socket != null) socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```


```java
package stu4;

import java.io.*;
import java.net.*;

public class SocketServer {
    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        Socket clientSocket = null;
        BufferedReader in = null;
        PrintWriter out = null;

        try {
            serverSocket = new ServerSocket(8000);
            System.out.println("Server is listening on port 8000");

            clientSocket = serverSocket.accept();
            System.out.println("Client connected");

            in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            out = new PrintWriter(clientSocket.getOutputStream(), true);

            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("Client: " + inputLine);
                if ("bye".equalsIgnoreCase(inputLine)) {
                    out.println("bye");
                    break;
                }
                out.println("Server received: " + inputLine);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (in != null) in.close();
                if (out != null) out.close();
                if (clientSocket != null) clientSocket.close();
                if (serverSocket != null) serverSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```


# stu5
```java
package stu5;

import java.io.*;
import java.net.*;

public class ClientTest {
    public static void main(String[] args) {
        try {
            // 创建Socket对象，连接到指定的服务器端地址(localhost，5678端口号)
            Socket socket = new Socket("localhost", 5678);
            System.out.println("连接到服务器...");
            
            // 读取D盘根目录下test.txt文件
            File inputFile = new File("D:\\test.txt");
            FileInputStream fileInputStream = new FileInputStream(inputFile);
            
            // 建立连接后，将文件内容写到Socket输出流中
            OutputStream outputStream = socket.getOutputStream();
            
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            
            // 数据传输结束，关闭流和连接
            outputStream.close();
            fileInputStream.close();
            socket.close();
            
            System.out.println("文件发送完成，连接关闭。");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```


```java
package stu5;

import java.io.*;
import java.net.*;

public class ServerTest {
    public static void main(String[] args) {
        try {
            // 创建ServerSocket对象，监听端口号5678
            ServerSocket serverSocket = new ServerSocket(5678);
            System.out.println("服务器启动，等待客户端连接...");
            
            // 调用accept方法接收客户端的连接请求,获得一个客户端socket对象
            Socket socket = serverSocket.accept();
            System.out.println("客户端连接成功！");
            
            // 通过Socket对象的getInputStream方法获取客户端发送过来的数据流
            InputStream inputStream = socket.getInputStream();
            
            // 将数据流写到指定的目录中
            File outputFile = new File("C:\\upload\\test.txt");
            outputFile.getParentFile().mkdirs(); // 确保目录存在
            FileOutputStream fileOutputStream = new FileOutputStream(outputFile);
            
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                fileOutputStream.write(buffer, 0, bytesRead);
            }
            
            // 数据传输结束，关闭流和连接
            fileOutputStream.close();
            inputStream.close();
            socket.close();
            serverSocket.close();
            
            System.out.println("文件接收完成，连接关闭。");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

# 1.sql

```sql
USE petstore;

-- (1) 为 product 表中“catid”列创建外键，以保证删除 category 表中“catid”列的值时，如果 product 表中的“catid”列还有记录，则拒绝删除操作。
ALTER TABLE product
ADD CONSTRAINT fk_catid
FOREIGN KEY (catid) REFERENCES category(catid)
ON DELETE RESTRICT;

-- (2) 为 lineitem 表中的“orderid”列创建外键，以保证删除 orders 表中的订单号时，会自动删除 lineitem 表中匹配的行。
ALTER TABLE lineitem
ADD CONSTRAINT fk_orderid
FOREIGN KEY (orderid) REFERENCES orders(orderid)
ON DELETE CASCADE;

-- (3) 为 account 表中的“sex”列添加 CHECK 完整性约束，以保证性别只能包含“男”或“女”。
ALTER TABLE account
ADD CONSTRAINT chk_sex
CHECK (sex IN ('男', '女'));

-- (4) 购进一批天使鱼，数量为50尾，进价为15元/尾，按平均值调整商品成本价格，并调整市场价格和数量。
UPDATE product
SET unitcost = (unitcost * qty + 15 * 50) / (qty + 50),
    listprice = ((unitcost * qty + 15 * 50) / (qty + 50)) * 1.20,
    qty = qty + 50
WHERE productid = 'FI-SW-01';

-- (5) 将用户名为“u0004”的所有订购信息删除，包括订单表和订单明细表的信息。
DELETE FROM lineitem WHERE orderid IN (SELECT orderid FROM orders WHERE userid = 'u0004');
DELETE FROM orders WHERE userid = 'u0004';

-- (6) 查询 account 表中客户的姓名、地址和电话，显示的列标题要求显示“姓名”、“地址”“电话”。
SELECT fullname AS '姓名', address AS '地址', phone AS '电话' FROM account;

-- (7) 显示 orders 表中单笔订单金额大于等于 200 元的用户号、订单总价和订单状态。
SELECT userid, totalprice, status FROM orders WHERE totalprice >= 200;

-- (8) 统计 2020 年 5 月以前订购了商品的女客户的姓名和订单总价。
SELECT a.fullname, SUM(o.totalprice) AS total_order_price
FROM account a
JOIN orders o ON a.userid = o.userid
WHERE a.sex = '女' AND o.orderdate < '2020-05-01'
GROUP BY a.fullname;

-- (9) 显示 orders 表中的单笔最高成交额和最低成交额。
SELECT MAX(totalprice) AS max_price, MIN(totalprice) AS min_price FROM orders;

```

# 2.sql
```sql
USE petstore;
-- (1) 创建外键，保证在删除和更新 account 表中的数据时，
--     只要 orders 表中还有该客户的订单，则拒绝 account 表进行删除和更新操作。
ALTER TABLE orders
ADD CONSTRAINT fk_userid
FOREIGN KEY (userid) REFERENCES account(userid)
ON DELETE RESTRICT
ON UPDATE RESTRICT;

-- (2) 修改订单号为“20130411”的订单状态为“1”。
UPDATE orders
SET status = 1
WHERE orderid = 20130411;

-- (3) 查询 lineitem 表中的商品号和单价，要求消除重复行。
SELECT DISTINCT itemid, unitprice
FROM lineitem;

-- (4) 查询 account 表中客户的姓名和性别，要求性别为“男”时显示 1，为“女”时显示 0。
SELECT fullname,
       CASE sex
           WHEN '男' THEN 1
           WHEN '女' THEN 0
       END AS sex
FROM account;

-- (5) 查询 product 表中商品号倒数第 4 个标号为“W”的商品信息。
SELECT *
FROM product
WHERE productid LIKE '%W'
ORDER BY productid DESC
LIMIT 1 OFFSET 3;

-- (6) 查询 lineitem 表中的订单号、商品名称和购买数量。
SELECT l.orderid, p.name, l.quantity
FROM lineitem l
JOIN product p ON l.itemid = p.productid;

-- (7) 查询“刘晓和”的基本情况和订单情况。
SELECT a.*, o.*
FROM account a
LEFT JOIN orders o ON a.userid = o.userid
WHERE a.fullname = '刘晓和';

-- (8) 统计客户总数。
SELECT COUNT(*) AS total_customers
FROM account;

-- (9) 按商品类别统计各类商品总数、平均成本单价（unitcost）。
SELECT catid, COUNT(*) AS product_count, AVG(unitcost) AS average_unitcost
FROM product
GROUP BY catid;

-- (10) 将 orders 表按用户从小到大排序，用户号相同的按订单日期从大到小排序。
SELECT *
FROM orders
ORDER BY userid ASC, orderdate DESC;

```

3.sql
```sql
-- 为 lineitem 表中的 itemid 列创建外键
ALTER TABLE lineitem 
ADD CONSTRAINT fk_itemid 
FOREIGN KEY (itemid) REFERENCES product(productid) 
ON DELETE CASCADE 
ON UPDATE CASCADE;

-- 计算 lineitem 表中每条记录的商品金额
SELECT orderid, itemid, quantity, unitprice, (quantity * unitprice) AS total_amount
FROM lineitem;

-- 查询 product 表中的商品名和档次
SELECT name, 
       CASE 
           WHEN unitcost < 1000 THEN '低价商品'
           WHEN unitcost BETWEEN 1000 AND 2000 THEN '中档商品'
           ELSE '高档商品'
       END AS 等级
FROM product;

-- 查询 account 表中女客户的姓名、地址和电话，显示列标题为中文“姓名”、“地址”、“电话”
SELECT fullname AS 姓名, address AS 地址, phone AS 电话
FROM account
WHERE sex = '女';

-- 查询 orders 表中订单总价在 200~500 元区间（包含 200 和 500）的订单信息
SELECT * 
FROM orders
WHERE totalprice BETWEEN 200 AND 500;

-- 显示 orders 表中单笔订单金额大于等于 300 元的用户名、订单总价
SELECT a.fullname, o.totalprice
FROM orders o
JOIN account a ON o.userid = a.userid
WHERE o.totalprice >= 300;

-- 计算 orders 表中的成交总额
SELECT SUM(totalprice) AS 总成交额
FROM orders;

-- 按性别统计客户人数
SELECT sex, COUNT(*) AS 人数
FROM account
GROUP BY sex;

-- 显示 lineitem 表中商品的购买总数量超过 2 件的商品号和购买总数量，并按购买数量从小到大排序
SELECT itemid, SUM(quantity) AS 总购买数量
FROM lineitem
GROUP BY itemid
HAVING SUM(quantity) > 2
ORDER BY 总购买数量 ASC;

-- 当订单号为“20130411”的订单已经发货后，根据该订单的订单明细表修改商品表的库存
UPDATE product p
JOIN lineitem l ON p.productid = l.itemid
SET p.qty = p.qty - l.quantity
WHERE l.orderid = 20130411;
```

# 4.sql
```sql

use librarydb;
-- (1) 编写 SQL 语句,建立数据完整性约束。
-- 为读者表创建外键，其“类别号”列的值必须是读者类型表中“类别号”列存在的值，删
-- 除或修改读者类型表中的类别号值时，
-- 读者表中“类别号”列的数据也随之变化。
ALTER TABLE 读者表 
ADD CONSTRAINT FK_类别号 
FOREIGN KEY (类别号) REFERENCES 读者类型表(类别号) 
ON DELETE CASCADE 
ON UPDATE CASCADE;

-- (2) 编写 SQL 语句,建立数据完整性约束。修改读者类型表，可借数量必须在0~30本的范围内。
ALTER TABLE 读者类型表 
ADD CONSTRAINT CHECK (可借数量 BETWEEN 0 AND 30);

-- (3) 编写 SQL 语句，读者编号为“2001”的职工借阅了一本条码为“223410”的图书，
-- 请在借阅表中添加一条记录，借阅号为顺序编号，借阅日期为系统当天日期。
-- 修改库存表中该图书的库存状态为“借出”。
INSERT INTO 借阅表 (条码, 读者编号, 借阅日期, 借阅状态) 
VALUES ('223410', '2001', CURDATE(), '借阅');
UPDATE 库存表 SET 库存状态 = '借出' 
WHERE 条码 = '223410';

-- (4) 编写 SQL 语句，当读者“苏明”毕业了，
-- 请将该读者的信息（读者表和借阅表信息）从数据库中删除。
DELETE FROM 借阅表 
WHERE 读者编号 = (SELECT 读者编号 FROM 读者表 WHERE 姓名 = '苏明');
DELETE FROM 读者表 WHERE 姓名 = '苏明';

-- (5) 编写 SQL 语句，查询库存表中的书号和库存状态列，要求消除重复行。
SELECT DISTINCT 书号, 库存状态 FROM 库存表;

-- (6) 编写 SQL 语句，查询库存表中存放位置中含“A”且库存状态为“借出”的图书的信息。
SELECT * FROM 库存表 WHERE 位置 LIKE '%A%' AND 库存状态 = '借出';

-- (7) 编写 SQL 语句，查询“张小东”的基本情况和借书情况。
SELECT 读者表.*, 借阅表.* FROM 读者表 LEFT JOIN 借阅表 
ON 读者表.读者编号 = 借阅表.读者编号 WHERE 读者表.姓名 = '张小东';

-- (8) 编写 SQL 语句，查询每个读者的姓名、单位、可借天数和可借数量。
SELECT 读者表.姓名, 读者表.单位, 读者类型表.可借天数, 读者类型表.可借数量
FROM 读者表 JOIN 读者类型表 ON 读者表.类别号 = 读者类型表.类别号;

-- (9) 编写 SQL 语句，按单位统计出该单位的读者人数。
SELECT 单位, COUNT(*) AS 读者人数 FROM 读者表 GROUP BY 单位;

-- (10) 编写 SQL 语句，使用子查询查出读者类型为“教师”和“学生”的读者信息。
SELECT * FROM 读者表 WHERE 类别号 IN 
(SELECT 类别号 FROM 读者类型表 WHERE 类名 IN ('教师', '学生'));

```


# 5.sql

```sql
use librarydb;

-- 1. 为数据库 LibraryDB 中的读者表指定主键为“读者编号”
ALTER TABLE 读者表 ADD PRIMARY KEY (读者编号);

-- 2. 为借阅表创建外键，
-- 借阅表中“条码”列中的值必须是库存表中“条码”列存在的值，
-- 当删除或修改库存表中的条码值时，
-- 借阅表中“条码”列的数据也要随之变化
ALTER TABLE 借阅表 ADD CONSTRAINT FK_条码 
FOREIGN KEY (条码) REFERENCES 库存表(条码) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- 3. 添加新图书及其入库信息
INSERT INTO 图书表 (书号, 书名, 类别, 作者, 出版社, 单价, 数量) 
VALUES ('C3325', '计算机基础', '计算机', '陈焕东', '高等教育出版社', 38.60, 2);
INSERT INTO 库存表 (条码, 书号, 位置, 库存状态) 
VALUES ('331122', 'C3325', '3-B-01', '在馆');
INSERT INTO 库存表 (条码, 书号, 位置, 库存状态) 
VALUES ('331123', 'C3325', '3-B-02', '在馆');

-- 4. 查询库存表中条码和库存状态，
-- 要求库存状态值为“在馆”时显示为“1”，“借出”时显示为“0”，“丢失”时显示为“-1”
SELECT 条码, 
       CASE 
           WHEN 库存状态 = '在馆' THEN '1'
           WHEN 库存状态 = '借出' THEN '0'
           WHEN 库存状态 = '丢失' THEN '-1'
           ELSE NULL
       END AS 库存状态
FROM 库存表;

-- 5. 查询图书表中财经和文学类图书中数量大于 5 本的图书信息
SELECT * 
FROM 图书表 
WHERE (类别 = '财经' OR 类别 = '文学') AND 数量 > 5;

-- 6. 查询每个读者的借阅信息，
-- 包括读者姓名、书名、借阅日期与借阅状态
SELECT 读者表.姓名, 图书表.书名, 借阅表.借阅日期, 借阅表.借阅状态
FROM 借阅表
JOIN 读者表 ON 借阅表.读者编号 = 读者表.读者编号
JOIN 库存表 ON 借阅表.条码 = 库存表.条码
JOIN 图书表 ON 库存表.书号 = 图书表.书号;

-- 7. 查找读者数在 2 人及以上的部门名称和读者人数
SELECT 单位, COUNT(*) AS 读者人数
FROM 读者表
GROUP BY 单位
HAVING COUNT(*) >= 2;

-- 8. 将图书表按数量从大到小排序
SELECT * FROM 图书表
ORDER BY 数量 DESC;

-- 9. 将借阅表按借阅状态升序排序，状态相同再按借阅日期从小到大排序
SELECT * FROM 借阅表
ORDER BY 借阅状态 ASC, 借阅日期 ASC;

```


# account
```java
package No3;

class AccountLock
{
	private int balance=0;
	private boolean isActivity = true;
	
	
	public synchronized void  put(int i)
	{
		while(!isActivity)
		{
			try {
				this.wait();
			}
			catch(InterruptedException e) {}
		}
		balance += i;
		isActivity = false;
		System.out.println("爸爸往账户中存入了"+i+"元，账户余额为"+balance);
		notify();
	}
	
	public synchronized int get(int j)
	{
		while(isActivity)
		{
			try
			{
				this.wait();
			}
			catch(InterruptedException e) {}
		} 
		balance -=j;
		if(balance==0) { System.out.println("儿子从账户中取出了"+j+"元,账户余额为零");
		isActivity =true;
		notify();}
		else if(balance<0){ System.out.println("账户余额小于您要取的前，请存钱");
		balance +=j;
		isActivity =true;
		notify();}
		else
			System.out.println("儿子从账户中取出了"+j+"元,账户余额为"+balance);
		return balance;
	}
}

class Daddy extends Thread
{
   private AccountLock al;
   public Daddy(AccountLock al) 
   {
	   this.al = al;
   }
   
   public void run()
   {
	   for(int i=1;i<=4;i++)
	   {
		   al.put(100*i);
		   
		  
	   }
   }
}

class Son extends Thread
{
	 private AccountLock al;
	 public Son(AccountLock al)
	 {
		 this.al = al;
	 }
	 
	 public void run()
	 {
		 for(int i=1;i<=4;i++)
		 {
			 al.get(100*i);
			 
			
		 }
	 }
}

public class Account
{
	public static void main(String[] args) 
	{
	    AccountLock al =new AccountLock();
		Daddy d =new Daddy(al);
		d.start();
		Son s=new Son(al);
		s.start();	
	}
}
```
