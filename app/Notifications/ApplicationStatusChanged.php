<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\RentalApplication;

class ApplicationStatusChanged extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct( private RentalApplication $application)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $application = $this->application;
        $unit = $application->rentalUnit;
        $status = $application->application_status;

        $message = (new MailMessage)
            ->greeting('Dear ' . $notifiable->user_name . ',');

        if($status === 'approved') {
            $message->subject('Application Approved!')
                ->line('**Congratulations! Your rental application has been approved!**')
                ->line('**Property: **' . $unit->address . ' - Unit ' . $unit->unit_number)
                ->line('**Monthly Rent:**₱' . number_format($unit->rent_price, 2))
                ->line('**Move-in Date:**' . $application->preferred_move_in_date)
                ->line('Next steps:')
                ->line('• Sign the lease agreement')
                ->line('• Submit security deposit')
                ->line('• Schedule move-in inspection')
                ->action('Complete Onboarding', url('/tenant/dashboard'));
        } else {
            $message->subject('Application Status Update')
                ->line('Thank you for your interest in our property.')
                ->line('**Property:**' . $unit->address . ' - Unit ' . $unit->unit_number)
                ->line('**Application Status:**' . ucfirst($status))
                ->line('We appreciate the time you took to apply.');

            if($application->review_notes) {
                $message->line('**Review Notes:**' . $application->review_notes);
            }
        }

        if($status !== 'approved') {
            $message->action('Browse Other Properties', url('/tenant/listings'));
        }

        return $message->line('If you have any questions, please don\'t hesitate to contact us.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
