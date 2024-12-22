const printLogs = (...args) => {
    args.forEach((arg) => {
        document.getElementById("output").textContent += arg + "\n";
    });
};

/**
 * @returns {{message: string; success: boolean}}
 */
const enterMessage = () => {
    const promptInputEl = document.querySelector("[contenteditable=true]");
    if (!promptInputEl) {
        return {
            message: "failed to find prompt input element",
            success: false,
        };
    }
    promptInputEl.textContent = "What are the top usecases of AI?";
    return {
        message: "enterMessage success",
        success: true,
    };
};

const sendPrompt = (tab) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: () => {
                const sendPromptBtn = document.querySelector(
                    'button[aria-label="Send prompt"]',
                );
                console.log(sendPromptBtn);
                if (!sendPromptBtn) {
                    return {
                        message: "failed to find send prompt button",
                        success: false,
                    };
                }
                sendPromptBtn.click();
                return {
                    message: "sendPrompt success",
                    success: true,
                };
            },
        },
        (results) => {
            console.log(results);
            if (results[0].result.success) {
                printLogs(results[0].result.message);
            }
        },
    );
};

document.getElementById("run-gpt").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    if (!tab || !tab.id) {
        console.error("No active tab found");
        return;
    }

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: enterMessage,
        },
        async (results) => {
            console.log(results);
            if (results[0].result.success) {
                printLogs(results[0].result.message);
            }

            await new Promise((resolve) => setTimeout(resolve, 500));
            sendPrompt(tab);
        },
    );
});
