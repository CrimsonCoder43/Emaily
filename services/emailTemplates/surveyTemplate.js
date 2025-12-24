const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${survey.subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
          <tr>
            <td style="padding: 20px 0;">
              <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">${
                      survey.subject || 'Survey Request'
                    }</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                      I would like your input!
                    </p>
                    <p style="margin: 0 0 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                      Please answer the following question:
                    </p>
                    
                    <!-- Survey Question Box -->
                    <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 0 0 40px; border-radius: 4px;">
                      <p style="margin: 0; color: #333333; font-size: 18px; font-weight: 500; line-height: 1.6;">
                        ${survey.body}
                      </p>
                    </div>
                    
                    <!-- Action Buttons -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 0 10px 0 0; width: 50%;">
                          <a href="${keys.redirectDomain}/api/surveys/${
    survey.id
  }/yes" 
                             style="display: block; padding: 16px 24px; background-color: #4caf50; color: #ffffff; text-decoration: none; border-radius: 6px; text-align: center; font-size: 16px; font-weight: 600; transition: background-color 0.3s;">
                            ✓ Yes
                          </a>
                        </td>
                        <td style="padding: 0 0 0 10px; width: 50%;">
                          <a href="${keys.redirectDomain}/api/surveys/${
    survey.id
  }/no" 
                             style="display: block; padding: 16px 24px; background-color: #f44336; color: #ffffff; text-decoration: none; border-radius: 6px; text-align: center; font-size: 16px; font-weight: 600; transition: background-color 0.3s;">
                            ✗ No
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0; color: #6c757d; font-size: 14px; line-height: 1.5;">
                      This survey was sent via <strong>Emaily</strong><br>
                      <span style="color: #adb5bd;">Thank you for your participation!</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
