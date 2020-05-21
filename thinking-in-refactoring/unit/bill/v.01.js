/**
 * 设想有一个剧团，演员们经常在各种场合表演，通常客户会指定几出剧目，
 * 剧团会根据观众人数和剧目的类型向客户收费，并且还会有会员积分，提升客户忠诚度
 * 
 * plays 记录着剧团表演的剧目
 * invoice 记录着给客户开出的账单
 * 
 * 我们要做的工作是打印账单详情：
 * Statement for BigCo
 *    Hamlet: $650.00 (55 seats)
 *    As You Like It: $580.00 (35 seats)
 *    Othello: $500.00 (40 seats)
 * Amount owed is $1,730.00
 * You earned 47 credits

 */

const plays = {
  "hamlet": {
    "name": "Hamlet",
    "type": "tragedy"
  },
  "as-like": {
    "name": "As You Like It",
    "type": "comedy"
  },
  "othello": {
    "name": "Othello",
    "type": "tragedy"
  }
};

const invoice = {
  customer: "BigCo",
  performances: [{
      playID: "hamlet",
      audience: 55
    },
    {
      playID: "as-like",
      audience: 35
    },
    {
      playID: "othello",
      audience: 40
    }
  ]
};

// const playFor = (aPerformance) => plays[aPerformance.playID];

/**
 * totalAmount: 账单总花费
 * volumeCredits: 获得会员积分数
 * result: 最终账单详情
 * @param {object} invoice 账单
 * @param {object} plays 剧目表
 */
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf)); 

    // 计算会员积分
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 每五位观众额外加分
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // 打印单剧目账单信息
    result += `  ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  console.log(result)
  return result;

  // 提炼函数
  // 计算一场戏剧演出的费用
  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  // 内联变量
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
}

statement(invoice, plays)