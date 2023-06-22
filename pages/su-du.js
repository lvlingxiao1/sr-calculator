import React, { useState } from "react";
import styles from "../styles/styles.module.scss";

export default function 速度页面() {
    const [基础速度, 设置基础速度] = useState(100);
    const [速度百分比, 设置速度百分比] = useState(0);
    const [行动缩短, 设置行动缩短] = useState(0);

    const 需要速度 = (() => {
        const 面板速度 = 基础速度 * (1 + 速度百分比 / 100);
        const 基础行动条 = 10000;
        const 行动条 = 基础行动条 * (1 - 行动缩短 / 100);

        const 目标速度1回2动 = (200 * 行动条) / (1 * 基础行动条);
        const 目标速度4回7动 = (700 * 行动条) / (4 * 基础行动条);
        const 目标速度3回5动 = (500 * 行动条) / (3 * 基础行动条);
        const 目标速度2回3动 = (300 * 行动条) / (2 * 基础行动条);
        const 目标速度3回4动 = (400 * 行动条) / (3 * 基础行动条);
        const 目标速度4回5动 = (500 * 行动条) / (4 * 基础行动条);
        const 目标速度5回6动 = (600 * 行动条) / (5 * 基础行动条);

        const 需求速度组 = [
            目标速度1回2动,
            目标速度4回7动,
            目标速度3回5动,
            目标速度2回3动,
            目标速度3回4动,
            目标速度4回5动,
            目标速度5回6动,
        ];

        return 需求速度组.map((目标速度) =>
            Math.max(Math.ceil(目标速度 - 面板速度), 0)
        );
    })();

    return (
        <>
            <div>
                <div>
                    基础速度
                    <input
                        type="number"
                        onChange={(e) => 设置基础速度(+e.target.value)}
                        value={基础速度}
                    ></input>
                </div>
            </div>
            <div>
                <div>
                    速度百分比
                    <input
                        type="number"
                        onChange={(e) => 设置速度百分比(+e.target.value)}
                        value={速度百分比}
                    ></input>{" "}
                    %
                </div>
            </div>
            <div>
                <div>
                    行动缩短
                    <input
                        type="number"
                        onChange={(e) => 设置行动缩短(+e.target.value)}
                        value={行动缩短}
                    ></input>{" "}
                    %
                </div>
            </div>

            <div>
                目标行动回数所需额外速度：
                <br />
                <div>1回2动: {需要速度[0]}</div>
                <div>4回7动: {需要速度[1]}</div>
                <div>3回5动: {需要速度[2]}</div>
                <div>2回3动: {需要速度[3]}</div>
                <div>3回4动: {需要速度[4]}</div>
                <div>4回5动: {需要速度[5]}</div>
                <div>5回6动: {需要速度[6]}</div>
            </div>
        </>
    );
}
