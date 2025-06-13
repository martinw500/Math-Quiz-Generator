# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

Please report (suspected) security vulnerabilities to **[your-email@example.com]**. You will receive a response from us within 48 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity but historically within a few days.

## Security Considerations

### Backend Security
- Input validation on all API endpoints
- CORS properly configured
- No sensitive data in logs
- Rate limiting recommended for production

### Frontend Security
- No sensitive data stored in localStorage
- API calls use HTTPS in production
- Input sanitization for user data

### Deployment Security
- Use environment variables for configuration
- Enable HTTPS in production
- Regular dependency updates
- Secure headers configuration

## Best Practices for Contributors

1. **Never commit secrets** - API keys, passwords, etc.
2. **Validate all inputs** - Both frontend and backend
3. **Use HTTPS** - For all production deployments
4. **Keep dependencies updated** - Regular security updates
5. **Follow OWASP guidelines** - For web application security

Thank you for helping keep Math Quiz Generator secure!
