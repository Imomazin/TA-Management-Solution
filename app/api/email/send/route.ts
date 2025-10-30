import { NextRequest, NextResponse } from 'next/server'
import { mockEmailTemplates } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()
    const { to, templateId, variables } = requestBody

    if (!to || !templateId) {
      return NextResponse.json(
        { error: 'Missing required fields: to, templateId' },
        { status: 400 }
      )
    }

    // Find template
    const template = mockEmailTemplates.find(t => t.id === templateId)
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    // Replace variables in template
    let subject = template.subject
    let emailBody = template.body

    if (variables) {
      Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g')
        subject = subject.replace(regex, variables[key])
        emailBody = emailBody.replace(regex, variables[key])
      })
    }

    // Mock email sending (in production, use SendGrid, AWS SES, etc.)
    console.log('📧 Mock Email Sent:')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log('Body:', emailBody)

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: `email_${Date.now()}`,
      to,
      subject,
    })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
