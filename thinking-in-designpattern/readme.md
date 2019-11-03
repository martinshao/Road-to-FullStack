# 设计模式

设计模式（Design Pattern）是前辈们对代码开发经验的总结，是解决特定问题的一系列套路。它不是语法规定，而是一套用来提高代码可复用性、可维护性、可读性、稳健性以及安全性的解决方案。

1995 年，GoF（Gang of Four，四人组/四人帮）合作出版了《设计模式：可复用面向对象软件的基础》一书，共收录了 23 种设计模式，从此树立了软件设计模式领域的里程碑，人称「GoF设计模式」。

## 面向对象程序设计五大原则——SOLID

* 单一职责原则（SRP）
* 开放封闭原则（OCP）
* 里氏替换原则（LSP）
* 接口隔离原则（ISP）
* 依赖倒置原则（DIP）
* 小结

SOLID 是面向对象设计5大重要原则的首字母缩写，当我们设计类和模块时，遵守 SOLID 原则可以让软件更加健壮和稳定。那么，什么是 SOLID 原则呢？本篇文章我将谈谈 SOLID 原则在软件开发中的具体使用。

### 单一职责原则（SRP）

单一职责原则（SRP）表明一个类有且只有一个职责。一个类就像容器一样，它能添加任意数量的属性、方法等。然而，如果你试图让一个类实现太多，很快这个类就会变得笨重。任意小的改变都将导致这个单一类的变化。当你改了这个类，你将需要重新测试一遍。如果你遵守 SRP，你的类将变得简洁和灵活。每一个类将负责单一的问题、任务或者它关注的点，这种方式你只需要改变相应的类，只有这个类需要再次测试。SRP 核心是把整个问题分为小部分，并且每个小部分都将通过一个单独的类负责。

假设你在构建一个应用程序，其中有个模块是根据条件搜索顾客并以Excel形式导出。随着业务的发展，搜索条件会不断增加，导出数据的分类也会不断增加。如果此时将搜索与数据导出功能放在同一个类中，势必会变的笨重起来，即使是微小的改动，也可能影响其他功能。所以根据单一职责原则，一个类只有一个职责，故创建两个单独的类，分别处理搜索以及导出数据。

### 开放封闭原则（OCP）

开放封闭原则（OCP）指出，一个类应该对扩展开放，对修改关闭。这意味一旦你创建了一个类并且应用程序的其他部分开始使用它，你不应该修改它。为什么呢？因为如果你改变它，很可能你的改变会引发系统的崩溃。如果你需要一些额外功能，你应该扩展这个类而不是修改它。使用这种方式，现有系统不会看到任何新变化的影响。同时，你只需要测试新创建的类。

假设你现在正在开发一个 Web 应用程序，包括一个在线纳税计算器。用户可以访问Web 页面,指定他们的收入和费用的细节,并使用一些数学公式来计算应纳税额。考虑到这一点，你创建了如下类：

``` java
public class TaxCalculator
{
    public decimal Calculate(decimal income, decimal deduction, string country)
    {
        decimal taxAmount = 0;
        decimal taxableIncome = income - deduction;
        switch (country)
        {
            case "India":
                //Todo calculation
                break;
            case "USA":
                //Todo calculation
                break;
            case "UK":
                //Todocalculation
                break;
        }
        return taxAmount;
    }
}
```

这个方法非常简单，通过指定收入和支出，可以动态切换不同的国家计算不同的纳税额。但这里隐含了一个问题，它只考虑了3个国家。当这个 Web 应用变得越来越流行时，越来越多的国家将被加进来，你不得不去修改 Calculate 方法。这违反了开放封闭原则，有可能你的修改会导致系统其他模块的崩溃。

让我们对这个功能进行重构，以符合对扩展是开放，对修改是封闭的。

根据类图，可以看到通过继承实现横向的扩展，并且不会引发对其他不相关类的修改。这时 TaxCalculator 类中的 Calculate 方法会异常简单：

``` java
public decimal Calculate(CountryTaxCalculator obj)
{
    decimal taxAmount = 0;
    taxAmount = obj.CalculateTaxAmount();
    return taxAmount;
}
```

### 里氏替换原则（LSP）

里氏替换原则指出，派生的子类应该是可替换基类的，也就是说任何基类可以出现的地方，子类一定可以出现。值得注意的是，当你通过继承实现多态行为时，如果派生类没有遵守LSP，可能会让系统引发异常。所以请谨慎使用继承，只有确定是“is-a”的关系时才使用继承。

假设你在开发一个大的门户网站，并提供很多定制的功能给终端用户，根据用户的级别，系统提供了不同级别的设定。考虑到这个需求，设计如下类图：

可以看到，ISettings 接口有 GlobalSettings、SectionSettings 以及 UserSettings 三个不同的实现。GlobalSettings 设置会影响整个应用程序,例如标题、主题等。SectionSettings 适用于门户的各个部分,如新闻、天气、体育等设置。UserSettings 为特定登录用户设置,如电子邮件和通知偏好。

这样的设计没问题，但如果有另一个需求，系统需要支持游客访问，唯一区别是游客不支持系统的设定，为了满足这个需求，你可能会如下设计：

``` java
public class GuestSettings : ISettings
{
    public void GetSettings()
    {
        //get settings from database
        //include guest name、ip address...
    }

    public void SetSettings()
    {
        //guests are not allowed set settings
        throw new NotImplementedException();
    }
}
```

这样没问题吗？准确来说，系统存在隐患。当单独使用 GuestSettings 时，因为我们了解游客不能设置，所以我们潜意识并不会主动调用 SetSettings 方法。但是由于多态，ISettings 接口的实现可以被替换为 GuestSettings 对象，当调用SetSettings 方法时，可能会引发系统异常。

重构这个功能，拆分为两个不同的接口：IReadableSettings 和 IWritableSettings。子类根据需求实现所需的接口。

### 接口隔离原则（ISP）

接口隔离原则（ISP）表明类不应该被迫依赖他们不使用的方法，也就是说一个接口应该拥有尽可能少的行为，它是精简的，也是单一的。

假设你正在开发一个电子商务的网站,需要有一个购物车和关联订单处理机制。你设计一个接口 IOrderProcessor,它用包含一个验证信用卡是否有效的方法（ValidateCardInfo）以及收件人地址是否有效的方法（ValidateShippingAddress）。与此同时，创建一个OnlineOrderProcessor 的类表示在线支付。

这非常好，你的网站也能正常工作。现在让我们来考虑另一种情形，假设在线信用卡支付不再有效，公司决定接受货到付款支付。
乍一看,这个解决方案听起来很简单,你可以创建一个CashOnDeliveryProcessor 并实现 IOrderProcessor 接口。货到付款的购买方式不会涉及任何信贷卡验证,所以，CashOnDeliveryOrderProcessor 类内部的 ValidateCardInfo 方法抛出 NotImplementedException。

这样的设计在未来可能会出现的潜在问题。假设由于某种原因在线信用用卡付款需要额外的验证步骤。自然,IOrderProcessor 将被修改，它将包括那些额外的方法,于此同时 OnlineOrderProcessor 将实现这些额外的方法。然而,CashOnDeliveryOrderProcessor 尽管不需要任何的附加功能,但你必须实现这些附加的功能。显然，这违反了接口隔离原则。

你需要将这个功能重构：

新的设计分成两个接口。IOrderProcessor 接口只包含两个方法：ValidateShippingAddress 和 ProcessOrder，而 ValidateCardInfo 抽象到到一个单独的接口：IOnlineOrderProcessor。现在,在线信用卡支付的任何改变只局限于IOnlineOrderProcessor 和它的子类实现，而 CashOnDeliveryOrderProcessor 是不会被影响。因此,新设计符合接口隔离原则。

### 依赖倒置原则（DIP）

依赖倒置原则（DIP）表明高层模块不应该依赖低层模块，相反，他们应该依赖抽象类或者接口。这意味着你不应该在高层模块中使用具体的低层模块。因为这样的话，高层模块变得紧耦合低层模块。如果明天，你改变了低层模块，那么高层模块也会被修改。根据DIP原则，高层模块应该依赖抽象（以抽象类或者接口的形式），低层模块也是如此。通过面向接口（抽象类）编程，紧耦合被移除。

那么什么是高层模块，什么是低层模块呢？通常情况下，我们会在一个类（高层模块）的内部实例化它依赖的对象（低层模块），这样势必造成两者的紧耦合，任何依赖对象的改变都将引起类的改变。

依赖倒置原则表明高层模块、低层模块都依赖于抽象，举个例子，你现在正在开发一个通知系统，当用户改变密码时，邮件通知用户。

``` java
public class UserManager
{

    public void ChangePassword(string username,string oldpwd,string newpwd)
    {
        EmailNotifier notifier = new EmailNotifier();

        //add some logic and change password
        //Notify the user
        notifier.Notify("Password was changed on "+DateTime.Now);
    }
}
```

这样的实现在功能上没有问题，但试想一下，新的需求希望通过SNS形式通知用户，那么我们只能手动将EmaiNorifier 替换为 SNSNotifier。在这儿，UserManager 就是高层模块，而EmailNotifier 就是低层模块，他们彼此耦合。我们希望解耦，依赖于抽象 INotifier，也就是面向接口的编程。

## 重要学习资料

* [图说设计模式][2]
* [Java设计模式：23种设计模式全面解析（超级详细）][1]
* [菜鸟——设计模式][3]
* [面向对象之七大基本原则（javaScript）][4]
* [极客学院——设计模式][5]

[2]: https://design-patterns.readthedocs.io/zh_CN/latest/
[1]: http://c.biancheng.net/design_pattern/
[3]: https://www.runoob.com/design-pattern/design-pattern-tutorial.html
[4]: https://segmentfault.com/a/1190000020319171
[5]: http://wiki.jikexueyuan.com/project/javascript-design-patterns/
